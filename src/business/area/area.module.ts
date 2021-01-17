import { CACHE_MANAGER, Logger, Module } from "@nestjs/common";
import { AreaController } from "./area.controller";
import { AreaRepository } from "../../domain/repositories/area.repository";
import { AreaService } from "./area.service";
import { CommonModule } from "../../modules/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AreaRepository,
    ]),
  ],
  controllers: [
    AreaController,
  ],
  providers: [
    AreaService,
  ],
})
export class AreaModule {

}