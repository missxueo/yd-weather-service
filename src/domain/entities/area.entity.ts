import { Entity, Column, PrimaryColumn } from 'typeorm';
import { 
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';

@Entity('t_area')
export class AreaEntity {

  @IsNotEmpty()
  @PrimaryColumn({ name: 'area_code' })
  areaCode: string;

  @IsNotEmpty()
  @Column({ name: 'area_name' })
  areaName: string;

  @IsNumber()
  @Column({ name: 'sort_no' })
  sortNo: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Column()
  level: number;

  @Column({name: 'parent_area_code'})
  parentAreaCode?: string;

  parent?: AreaEntity;
}

