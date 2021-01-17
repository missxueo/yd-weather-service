import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';


@Entity("t_dict")
export class DictEntity {

  @PrimaryColumn({ name: 'dict_code' })
  dictCode: string;

  @Column({ name: 'dict_name' })
  dictName: string;

  @Column()
  describe?: string;
  
}
