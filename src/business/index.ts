import { MiddlewareConsumer, Module } from "@nestjs/common";
import { LoggerMiddleware } from "../infrastructure/middlewares/logger.middleware";
import { AreaModule } from './area/area.module'
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from "@nestjs/cqrs";
import { WeatherModule } from "./weather/weather.module";


@Module({
  imports: [
    AreaModule,
    WeatherModule,
  ],
})
export default class MainModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*");
  }
}