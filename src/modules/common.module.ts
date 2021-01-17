import { CacheModule, CACHE_MANAGER, Global, HttpModule, Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigReader from '../infrastructure/utils/configReader';
import { redlockProviderFactory, REDLOCK_PROVIDER, } from '../infrastructure/providers/redlock.provider';
import { CqrsModule } from "@nestjs/cqrs";
import { BullModule } from "@nestjs/bull";
import { ScheduleModule } from "@nestjs/schedule";
import { EntitySubscriber } from "../domain/repositories/subscribes/entitySubscriber";

@Global()
@Module({
  imports: [
    HttpModule,
    CqrsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ],
      inject: [ConfigService, ],
      useFactory(configService: ConfigService){
        const reader = new ConfigReader(configService);
        return {
          ...reader.readDbConfig(),
          entities: ['dist/**/entities/*.entity{.ts,.js}'],
          logging: true,
        }
      }
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule, ],
      inject: [ConfigService, ],
      useFactory(configService: ConfigService){
        const reader = new ConfigReader(configService);
        return reader.readRedisConfig();
      }
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule, ],
      inject: [ConfigService, ],
      useFactory(configService: ConfigService){
        const reader = new ConfigReader(configService);
        return {
          defaultJobOptions: {
            removeOnComplete: true,
            attempts: 1,
          },
          limiter: {
            max: 10,
            duration: 100,
          },
          redis: {
            ...reader.readIORedisConfig(),
          },
        };
      },
    })

  ],
  providers: [
    redlockProviderFactory,
    Logger,
    EntitySubscriber,
  ],
  exports: [
    REDLOCK_PROVIDER,
    Logger,
    CacheModule,
    ConfigModule,
    CqrsModule,
    BullModule,
    HttpModule,
    EntitySubscriber,
  ]
})
export class CommonModule {

}