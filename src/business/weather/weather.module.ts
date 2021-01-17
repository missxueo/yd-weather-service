import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AreaRepository } from "../../domain/repositories";
import { SaveWeatherCommandHandler } from "../../domain/commands/saveWeather.cmd";
import { WeatherForecastRepository } from "../../domain/repositories/weatherForecast.repository";
import { WeatherRecordRepository } from "../../domain/repositories/weatherRecord.repository";
import { WEAHTER_PULL_QUEUE } from "../../infrastructure/constant";
import { WeatherTaskQueueConsumer } from "./consumers/weatherTask.consumer";
import { WeatherController } from "./controllers/weather.controller";
import { WeatherService } from "./services/weather.service";
import { WeatherTaskCronServcie } from "./services/weatherTaskCron.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      WeatherRecordRepository,
      WeatherForecastRepository,
      AreaRepository,
    ]),
    BullModule.registerQueue({
      name: WEAHTER_PULL_QUEUE,
    }),
  ],
  providers: [
    WeatherService,
    WeatherTaskQueueConsumer,
    WeatherTaskCronServcie,
    SaveWeatherCommandHandler,
  ],
  controllers: [
    WeatherController,
  ],
})
export class WeatherModule {

}