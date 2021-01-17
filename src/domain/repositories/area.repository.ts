import {  } from '@nestjs/typeorm'
import { AreaEntity } from '../entities/area.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AreaEntity)
export class AreaRepository extends Repository<AreaEntity> {

  async *selectAreaList(level:number = 3, rows: number = 100): AsyncGenerator<AreaEntity[]>{
    let page = 0;
    do{
      const coll = await this.createQueryBuilder('area')
        .select(['area.areaCode'])
        .where('area.level = :level', { level, })
        .orderBy('area.areaCode', 'ASC')
        .skip(page * rows)
        .take(rows)
        .getMany();
      if(!coll.length)
        return;
      yield coll; 
      page++;
    }while(true);
  }

}