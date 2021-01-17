import { CACHE_MANAGER, Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { WeatherForecastEntity } from "../entities/weatherForecast.entity";
import { WeatherRecordEntity } from "../entities/weatherRecord.entity";
import { WeatherForecastRepository } from "../repositories/weatherForecast.repository";
import { WeatherRecordRepository } from "../repositories/weatherRecord.repository";
import { v1 as uuidv1 } from 'uuid';
import { Cache } from "cache-manager";
import { DAY_MS } from "src/infrastructure/constant";

/**
 * 保存天气命令
 */
export class SaveWeatherCommand implements ICommand {
  
  constructor(
    readonly realWeather: Partial<WeatherRecordEntity>,
    readonly forecastWeatherColl?: Partial<WeatherForecastEntity>[],
    eventId?: string,
  ){
    this.__eventId = eventId || uuidv1();
  }

  __eventId: string;
}

@CommandHandler(SaveWeatherCommand)
export class SaveWeatherCommandHandler implements ICommandHandler<SaveWeatherCommand>{
  constructor(
    private readonly logger: Logger,
    private readonly weatherRecordRepo: WeatherRecordRepository,
    private readonly weatherForecastRepo: WeatherForecastRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ){}
  
  async execute(command: SaveWeatherCommand): Promise<any> {
    this.logger.debug('start save-weather cmd');
    
    if(command.realWeather){
      this.saveWeatherAsync(command.realWeather);
    }
    if(command.forecastWeatherColl){
      for(const forecast of command.forecastWeatherColl) {
        await this.addWeatherForecastAsync(forecast);
      }
    }
    this.logger.debug('end save-weather cmd');
  }

  private async saveWeatherAsync(record: Partial<WeatherRecordEntity>): Promise<void> {
    if(!record.areaCode) return;
    const key = `weather:real:${record.areaCode}`;
    await Promise.all([
      this.cacheManager.set(key, record, { ttl: DAY_MS * 7 }),
      this.weatherRecordRepo.save(record),
    ]);
  }

  private async addWeatherForecastAsync(item: Partial<WeatherForecastEntity>): Promise<void>{
    if(!item.areaCode || !item.forecastDate) return;
    const ifExist = await this.weatherForecastRepo.existWeatherForecast(item.areaCode, item.forecastDate);
    if(ifExist) return;
    this.weatherForecastRepo.saveWeatherForecast(item as WeatherForecastEntity);
  }

}