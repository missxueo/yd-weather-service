import { Body, CacheInterceptor, CACHE_MANAGER, Controller, Get, Inject, Logger, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { succeed, fail, accept, ok, notfound,  } from '../../infrastructure/utils/responseUtils';
import { AreaEntity } from '../../domain/entities/area.entity';
import { IResponseModel } from '../../models/response.model';
import { AreaService } from './area.service';
import { AreaQueryModel } from './models/areaQuery.model';
import { SaveAreaModel } from '../../models/saveArea.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('areas')
@Controller("areas")
@UseInterceptors(CacheInterceptor)
export class AreaController {
  constructor(
    private readonly areaService: AreaService,
    private readonly logger: Logger,
    ) {}


  @ApiOperation({
    summary: '根据名称检索地区',
    description: '根据名称检索地区',
  })
  @Get()
  async getAreaByName(@Query('areaName') areaName: string): Promise<IResponseModel>{
    if(!areaName){
      return fail("areaName is required");
    }
    const aeraQuery = new AreaQueryModel();
    aeraQuery.areaNameLike = areaName;
    const list = await this.areaService.getCityAreaListByName(aeraQuery);
    return succeed(list.map(x=> ({
      areaCode: x.areaCode,
      areaName: x.areaName,
    })));
  }

  @ApiOperation({
    summary: '根据编码检索地区',
    description: '根据编码检索地区',
  })
  @Get(":areaCode")
  async getCityByCode(@Param('areaCode') areaCode: string): Promise<IResponseModel>{
    const city = await this.areaService.getCityByCode(areaCode);
    if(!city){
      return notfound('未找到城市');
    }
    const cityFlat = this.recurCity([], city);
    return succeed(cityFlat);
  }

  private recurCity(arr: any[], area: AreaEntity): any[]{
    if(!area) return;
    arr.push({ areaCode: area.areaCode, areaName: area.areaName });
    this.recurCity(arr, area.parent);
    return arr;
  }

  @ApiOperation({
    summary: '新增地区',
    description: '新增保存地区',
  })
  @Post()
  async saveArea(@Body() saveAreaDto: SaveAreaModel): Promise<IResponseModel>{
    const area: AreaEntity = saveAreaDto;
    await this.areaService.saveAreaAsync(area);
    return ok();
  }

  @ApiOperation({
    summary: '更新地区',
    description: '更新地区',
  })
  @Put(":areaCode")
  async updateArea(@Param('areaCode') areaCode: string, @Body() saveAreaDto: SaveAreaModel): Promise<IResponseModel>{
    const area: AreaEntity = saveAreaDto;
    area.areaCode = areaCode;
    await this.areaService.saveAreaAsync(area)
    return accept(area.areaCode);
  }

}
