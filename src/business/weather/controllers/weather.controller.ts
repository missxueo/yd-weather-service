import { 
  CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Logger, Param, Query, UseInterceptors,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { IResponseModel } from "../../../models/response.model";
import { WeatherService } from "../services/weather.service";
import * as dayJs from 'dayjs'
import { notfound, succeed } from "../../../infrastructure/utils/responseUtils";
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath, } from "@nestjs/swagger";
import { WeatherRecordEntity } from "../../../domain/entities/weatherRecord.entity";
import { WeatherForecastEntity } from "../../../domain/entities/weatherForecast.entity";
import { WEATHER_WITH_FORECAST, WEATHER_PURE } from '../../../examples/weatherWithFeature';

@ApiExtraModels(WeatherRecordEntity)
@ApiExtraModels(WeatherForecastEntity)
@ApiTags('weather')
@Controller('weather')
@UseInterceptors(CacheInterceptor)
export class WeatherController {
  constructor(
    private readonly logger: Logger,
    private readonly weatherService: WeatherService,
  ){}

  @ApiOperation({
    summary: '实时天气与预测天气',
    description: '根据区域编码获取实时天气与预测天气',
  })
  @ApiOkResponse({
    status: 200,
    description: '实时天气与预测天气聚合',
    schema: {
      $ref: getSchemaPath(WeatherForecastEntity),
      example: WEATHER_WITH_FORECAST,
    }
  })
  @CacheTTL(60)
  @Get(":areaCode")
  async getRealWeatherWithForecast(@Param('areaCode') areaCode: string,): Promise<IResponseModel> {
    const now = dayJs();
    const end = now.clone().add(15, 'days');
    const begin = now.clone().subtract(3, 'days');
    const result = await this.weatherService.getRealWeatherWithForecast(areaCode, begin.toDate(), end.toDate());
    return succeed(result);
  }

  @ApiOperation({
    summary: '实时天气',
    description: '根据区域编码获取实时天气'
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(WeatherRecordEntity),
      example: WEATHER_PURE,
    }
  })
  @Get("/pure/:areaCode")
  async getRealWeather(@Param('areaCode') areaCode: string, ): Promise<IResponseModel>{
    const result = await this.weatherService.getRealWeatherPriorFromCache(areaCode);
    return result ? succeed(result) : notfound('未找到该地区天气');
  }

}
