import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RoadmapEntity} from "../ rDomains/Roadmap.entity";
import {RoadmapService} from "../rServices/Roadmap.service";
import {RoadmapApicontroller} from "../rControllers/Roadmap.apicontroller";


@Module({
  imports: [TypeOrmModule.forFeature([RoadmapEntity])],
  providers: [RoadmapService],
  exports: [RoadmapService],
  controllers: [RoadmapApicontroller],
})
export class RoadmapsModule {}
