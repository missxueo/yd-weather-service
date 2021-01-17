import { EntityRepository, Repository } from 'typeorm';
import { WeatherForecastEntity } from './../entities/weatherForecast.entity'
import * as dayJs from 'dayjs'

@EntityRepository(WeatherForecastEntity)
export class WeatherForecastRepository extends Repository<WeatherForecastEntity> {

  selectWeatherForecastByRange(areaCode: string, beginDate: Date, endDate: Date): Promise<WeatherForecastEntity[]> {
    return this.createQueryBuilder('wf')
      .where('wf.areaCode = :areaCode and wf.forecastDate >= :beginDate and wf.forecastDate <= :endDate', { areaCode, beginDate, endDate })
      .orderBy('wf.forecastDate', 'ASC')
      .getMany();
  }

  async existWeatherForecast(areaCode: string, forecastDate: Date): Promise<number> {
    const id = this.generalId(areaCode, forecastDate);
    return await this.count({
      id: id,
    });
  }

  async saveWeatherForecast(entity: WeatherForecastEntity): Promise<string> {
    entity.id = this.generalId(entity.areaCode, entity.forecastDate);
    this.save(entity);
    return entity.id;
  }

  generalId(areaCode: string, date: Date): string{
    return `${areaCode}^${dayJs(date).format('YYYYMMDD')}`
  }

}