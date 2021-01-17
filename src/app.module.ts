import { CACHE_MANAGER, Logger, MiddlewareConsumer, Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './infrastructure/middlewares/logger.middleware';
import MainModule from './business';
import { CommonModule } from './modules/common.module';

@Module({
  imports: [
    MainModule,
    CommonModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  
}
