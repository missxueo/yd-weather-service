import { Injectable, Logger, CACHE_MANAGER, Inject, } from '@nestjs/common';
import { AreaEntity } from '../../domain/entities/area.entity';
import { Like } from 'typeorm';
import { AreaRepository } from '../../domain/repositories/area.repository';
import { AreaQueryModel } from './models/areaQuery.model';
import { Cache } from 'cache-manager';
import * as Redlock from 'redlock';
import { DAY_MS } from '../../infrastructure/constant';
import { REDLOCK_PROVIDER } from '../../infrastructure/providers/redlock.provider'

@Injectable()
export class AreaService {
  constructor(
    private readonly areaRepository: AreaRepository, 
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(REDLOCK_PROVIDER) private readonly locker: Redlock,
  ){}

  /**
   * 根据城市名称相似查询列表
   * @param areaQuery 
   * @returns
   */
  async getCityAreaListByName(areaQuery: AreaQueryModel ): Promise<AreaEntity[]>{
    return this.areaRepository.find({
      where: {
        areaName: Like(`%${areaQuery.areaNameLike}%`),
        level: 3,
      },
      ...areaQuery.asQuery(),
    });
  }

  /**
   * 查询地区 并缓存 30d
   * @param areaCode 区域编码
   * @returns 地区实体
   */
  async getAreaByCodeAsync(areaCode: string): Promise<AreaEntity | null>{
    const cacheKey = this.areaCacheKey(areaCode);
    let area = await this.cacheManager.get<AreaEntity>(cacheKey);
    if(area) return area.areaCode ? area : null;
    
    const lock = await this.locker.lock(`locker:${cacheKey}`, 300);
    try{
      area = await this.cacheManager.get<AreaEntity>(cacheKey);
      if(area) return area.areaCode ? area : null;

      area = await this.areaRepository.findOne(areaCode);
      if(area){
        await this.cacheManager.set(cacheKey, area, { ttl: DAY_MS * 30, } );
      }else{
        await this.cacheManager.set(cacheKey, {}, { ttl: DAY_MS, });
      }
      return area;
    }catch(e){
      this.logger.error('缓存锁定异常', e);
      return null;
    }finally{
      await this.locker.unlock(lock);
    }
  }

  async getAreaFromCache(areaCode: string): Promise<AreaEntity>{
    const cacheKey = this.areaCacheKey(areaCode);
    return await this.cacheManager.get<AreaEntity>(cacheKey);
  }

  async getCityByCode(areaCode: string): Promise<AreaEntity> {
    const area = await this.getAreaByCodeAsync(areaCode);
    if(area && area.parentAreaCode){
      area.parent = await this.getCityByCode(area.parentAreaCode);
    }
    return area;
  }

  private areaCacheKey(areaCode: string) {
    console.log('aeraCacheKey', areaCode, typeof areaCode);
    return `area:${areaCode}`
  }

  /**
   * save or update
   * @param area 地区
   */
  async saveAreaAsync(area: AreaEntity): Promise<void>{
    await this.areaRepository.save(area);
  }
  
}
