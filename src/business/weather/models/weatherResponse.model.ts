import { WeatherForecastEntity } from "../../../domain/entities/weatherForecast.entity";
import { WeatherRecordEntity } from "../../../domain/entities/weatherRecord.entity";

export interface WeatherResponse {
  
  real: Partial<WeatherRecordEntity>;

  forecast: Partial<WeatherForecastEntity>[];
}


