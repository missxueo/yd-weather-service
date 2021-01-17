import { InjectQueue } from "@nestjs/bull";
import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Queue } from "bull";
import { Cache } from "cache-manager";
import { AreaRepository } from "../../../domain/repositories";
import { WEAHTER_PULL_QUEUE } from './../../../infrastructure/constant';

const FALG = 'flag:task:weather';

@Injectable()
export class WeatherTaskCronServcie {
  constructor(
    private readonly logger: Logger,
    private readonly areaRepository: AreaRepository,
    @InjectQueue(WEAHTER_PULL_QUEUE) private readonly weatherPullQueue: Queue,
    @Inject(CACHE_MANAGER) private readonly cacheManage: Cache,
  ){}


  @Cron('0 0/30 * * * *')
  async jobHandle(){
    const flag = await this.cacheManage.get<number>(FALG);
    if(flag) return;
    await this.cacheManage.set(FALG, 1, { ttl: 10 * 60, })
    this.logger.log('weatherTaskService job is executed');
    let ct = 0;
    const areaPull = this.areaRepository.selectAreaList(3);
    for await (const areaColl of areaPull) {
      ct += areaColl.length;
      for (const profile of areaColl) {
        await this.weatherPullQueue.add(profile, {
          // jobId: profile.areaCode,
          jobId: profile.areaCode,
        });
      }
    }
    this.logger.log('weatherTaskService job push into queue finished, total: ' + ct);
  }

}