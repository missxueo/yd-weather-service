import { EntityRepository, Repository } from 'typeorm';
import { WeatherRecordEntity } from './../entities/weatherRecord.entity'

@EntityRepository(WeatherRecordEntity)
export class WeatherRecordRepository extends Repository<WeatherRecordEntity> {

  
  selectRecentWeatherByCode(areaCode: string): Promise<WeatherRecordEntity>{
    return this.findOne({
      where: {
        areaCode,
      },
      order: {
        id: 'DESC',
      }
    })
  }
}