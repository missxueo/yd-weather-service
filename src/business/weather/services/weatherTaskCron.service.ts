import { InjectQueue } from "@nestjs/bull";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Queue } from "bull";
import { AreaRepository } from "../../../domain/repositories";
import { WEAHTER_PULL_QUEUE } from './../../../infrastructure/constant';


@Injectable()
export class WeatherTaskCronServcie {
  constructor(
    private readonly logger: Logger,
    private readonly areaRepository: AreaRepository,
    @InjectQueue(WEAHTER_PULL_QUEUE) private readonly weatherPullQueue: Queue,
  ){}

  @Cron('0 0/30 * * * *')
  async jobHandle(){
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