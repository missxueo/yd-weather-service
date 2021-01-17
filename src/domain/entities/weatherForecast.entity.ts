import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("t_weather_forecast")
export class WeatherForecastEntity {

  @PrimaryColumn()
  id: string;

  @Column({ name: 'area_code' })
  areaCode: string;

  @ApiProperty()
  @Column({ name: 'temperature_lowest' })
  temperatureLowest: number;

  @Column({ name: 'temperature_highest' })
  @ApiProperty()
  temperatureHighest: number;

  @Column({ name: 'weather_type' })
  @ApiProperty()
  weatherType: string;

  @Column({ name: 'wind_level' })
  @ApiProperty()
  windLevel?: number;

  @Column({ name: 'wind_direction' })
  @ApiProperty()
  windDirection?: string;

  @Column({ name: 'air_quality_type' })
  @ApiProperty()
  airQualityType: string;

  @Column({ name: 'air_quality_value' })
  @ApiProperty()
  airQualityValue?: number;

  @Column({ name: 'air_humidity' })
  @ApiProperty()
  airHumidity?: number;

  @Column({ name: 'rain_percent' })
  @ApiProperty()
  rainPercent: number;

  /**
   * 预测日期
   */
  @Column({ name: 'forecast_date' })
  @ApiProperty()
  forecastDate: Date;

  /**
   * 创建时间
   */
  @Column({ name: 'create_time' })
  createTime: Date;
  
}
