import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource} from 'typeorm';
import {RoadmapEntity} from "../ rDomains/Roadmap.entity";

@Injectable()
export class RoadmapService {
    constructor(
        @InjectRepository(RoadmapEntity) private roadmapRepository: Repository<RoadmapEntity>,
        private dataSource: DataSource,
    ) {}

    async createRoadmap(author_id:number ,rm_name: string,rm_description: string)
    {
        const roadmap = await this.roadmapRepository.findOneBy({rm_name});
        if(roadmap){
            throw new UnprocessableEntityException(
                '해당 로드맵은 이미 있습니다.',
            );
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(roadmap)
        }catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release(); // connect Release
        }

    }

}
