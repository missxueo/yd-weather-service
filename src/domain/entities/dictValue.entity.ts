import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';


@Entity("t_dict_value")
export class DictValueEntity {

  @PrimaryColumn({ name: 'dv_code' })
  dvCode: string;

  @Column({ name: 'dv_label' })
  dvLabel: string;

  @Column()
  describe?: string;

  @Column({ name: 'dict_code' })
  dictCode: string;

  @Column({ name: 'sort_no' })
  sortNo?: number;
  
}
