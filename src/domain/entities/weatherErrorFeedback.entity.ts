import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("t_weather_error_feedback")
export class WeatherErrorFeedbackEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'area_code' })
  areaCode: string;

  @Column({ name: 'actual_weather_type' })
  actualWeatherType: string;

  @Column({ name: 'create_time' })
  createTime: Date;

  @Column({ name: 'create_by' })
  createBy?: string;
  
}
