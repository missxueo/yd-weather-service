import { Process, Processor } from "@nestjs/bull";
import { HttpService, Logger } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Job } from "bull";
import { SaveWeatherCommand } from "../../../domain/commands/saveWeather.cmd";
import { AreaEntity } from "../../../domain/entities/area.entity";
import { WeatherForecastEntity } from "../../../domain/entities/weatherForecast.entity";
import { WeatherRecordEntity } from "../../../domain/entities/weatherRecord.entity";
import {  AxiosResponse } from 'axios';
import { WEAHTER_PULL_QUEUE } from "../../../infrastructure/constant";

const THRID_WEATHER_URL = 'http://api.xmweatherapp.com/v2/realweather';

@Processor(WEAHTER_PULL_QUEUE)
export class WeatherTaskQueueConsumer {
  constructor(
    private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly cmdBus: CommandBus,
  ){}
  
  @Process()
  async process(job: Job<AreaEntity>): Promise<void> {
    const { areaCode } = job.data;
    this.logger.debug(`consumer executed: ${areaCode}`, WeatherTaskQueueConsumer.name);
    if(!areaCode) return;
    try{
      const resp: AxiosResponse<WeatherThirdModel> = await this.fetchFromThird(areaCode);
      // this.logger.debug(resp, 'fetchThirdApi');

      if(resp.status !== 200){
        this.logger.warn('consumer network error');
        return;
      }
      const cmd = this.thirdAdapter(areaCode, resp.data);
      if(!cmd){
        this.logger.warn('thrid weather api response serialize failed');
        return;
      }
      console.log(cmd);
      await this.cmdBus.execute(cmd);
    }catch(e){
      this.logger.error('consumer exected cmd failed', e);
    }
  }

  fetchFromThird(areaCode: string) {
    return this.httpService.get(THRID_WEATHER_URL, {
      params: {
        areaCode,
      }
    }).toPromise();
  }


  thirdAdapter(areaCode: string, data: WeatherThirdModel): SaveWeatherCommand | null{
    if(!data.realtime) return;
    const real: Partial<WeatherRecordEntity> = {
      areaCode,
      airHumidity: data.realtime.humidity,
      realTemperature: data.realtime.temperature,
      weatherType: data.realtime.skycon,
      windLevel: data.realtime.wind?.level,
      windDirection: data.realtime.wind?.direction,
      airQualityValue: data.realtime.air_quality?.value,
      airQualityType: data.realtime.air_quality?.desc,
    }
    const forecasts: Partial<WeatherForecastEntity>[] = data.forecast?.map(x => ({
      areaCode,
      airHumidity: x.humidity,
      temperatureLowest: x.temperature.lower,
      temperatureHighest: x.temperature.higher,
      weatherType: x.skycon,
      windLevel: x.wind?.level,
      windDirection: x.wind?.direction,
      airQualityValue: x.air_quality.value,
      airQualityType: x.air_quality.desc,
      forecastDate: new Date(x.date),
    }));
    return new SaveWeatherCommand(real, forecasts);
  }

}

export interface WeatherThirdModel {
  
  statusCode?: number;

  version?: string;

  forecast?: WeatherForecastThirdModel[];

  realtime?: WeatherRealtimeThridModel;

}

export interface WeatherRealtimeThridModel {
  air_quality: { desc: string, value: number };
  temperature: number;
  humidity?: number;
  skycon?: string;
  rain?: number;
  wind?: { level: number, direction: string };
}

export interface WeatherForecastThirdModel {
  air_quality: { desc: string, value: number };
  temperature: { lower: number; higher: number };
  humidity?: number;
  skycon?: string;
  rain?: number;
  wind?: { level: number, direction: string };
  date: number;
}