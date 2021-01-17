import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "t_weather_record"})
export class WeatherRecordEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'area_code' })
  areaCode: string;

  @ApiProperty({description : '实际温度'})
  @Column({ name: 'real_temperature' })
  realTemperature: number;

  @ApiProperty({description : '天气类别'})
  @Column({ name: 'weather_type' })
  weatherType: string;

  @ApiProperty({description : '风力等级'})
  @Column({ name: 'wind_level' })
  windLevel?: number;

  @ApiProperty({description : '风向'})
  @Column({ name: 'wind_direction' })
  windDirection?: string;

  @ApiProperty({description : '空气质量类别'})
  @Column({ name: 'air_quality_type' })
  airQualityType: string;

  @ApiProperty({description : '空气质量值'})
  @Column({ name: 'air_quality_value' })
  airQualityValue?: number;

  @ApiProperty({description : '空气湿度'})
  @Column({ name: 'air_humidity' })
  airHumidity?: number;

  @ApiProperty({description : '降雨率'})
  @Column({ name: 'rain_percent' })
  rainPercent: number;

  /**
   * 创建时间
   */
  @Column({ name: 'create_time' })
  createTime: Date;
  
}
