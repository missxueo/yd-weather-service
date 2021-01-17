import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import Redlock from "redlock";
import { DAY_MS } from "src/infrastructure/constant";
import { REDLOCK_PROVIDER } from "src/infrastructure/providers/redlock.provider";
import { WeatherRecordEntity } from "../../../domain/entities/weatherRecord.entity";
import { WeatherForecastRepository } from "../../../domain/repositories/weatherForecast.repository";
import { WeatherRecordRepository } from "../../../domain/repositories/weatherRecord.repository";
import { fastyClone } from "../../../infrastructure/utils/clone";
import { WeatherResponse } from "../models/weatherResponse.model";


@Injectable()
export class WeatherService {
  constructor(
    private readonly logger: Logger,
    private readonly weatherForecastRepo: WeatherForecastRepository,
    private readonly weatherRecordRepo: WeatherRecordRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(REDLOCK_PROVIDER) private readonly locker: Redlock
  ){}

  getRealWeatherByCode(areaCode: string): Promise<WeatherRecordEntity> {
    return this.weatherRecordRepo.selectRecentWeatherByCode(areaCode);
  }

  async getRealWeatherPriorFromCache(areaCode: string): Promise<WeatherRecordEntity> {
    const key = `weather:real:${areaCode}`;
    let item = await this.cacheManager.get<WeatherRecordEntity>(key);
    if(item) return item.areaCode ? item : null;
    const lock = await this.locker.lock(`lock: ${key}`, 500);
    try{
      let item = await this.cacheManager.get<WeatherRecordEntity>(key);
      if(item) return item.areaCode ? item : null;

      item = await this.getRealWeatherByCode(areaCode);
      await this.cacheManager.set(key, item || {}, { ttl: DAY_MS * 7 });
      return item;  
    }finally{
      await this.locker.unlock(lock);
    }
    
  }

  /**
   * 实时查询日期与预测
   * @param areaCode 地区编码
   * @param beginDate 
   * @param endDate 
   * @returns
   */
  async getRealWeatherWithForecast(areaCode: string, beginDate: Date, endDate: Date): Promise<WeatherResponse>{
    const [ realWeather, forecastWeatherColl] = await Promise.all([
      this.weatherRecordRepo.selectRecentWeatherByCode(areaCode),
      this.weatherForecastRepo.selectWeatherForecastByRange(areaCode, beginDate, endDate),
    ])

    return {
      real: fastyClone(realWeather, 'id', 'createTime'),
      forecast: forecastWeatherColl.map(x=>fastyClone(x, 'id', 'createTime')),
    }
  }

  

}
