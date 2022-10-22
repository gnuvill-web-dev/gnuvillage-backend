import { RoadmapEntity } from './Roadmap.entity';
import { NodeConnection } from './NodeConnection.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

@Entity('RoadMapNode')
export class RoadmapNodeEntity {
    @PrimaryGeneratedColumn()
    node_id: bigint;

    @Column()
    node_label: string;

    @Column()
    node_url: string;

    @JoinColumn()
    @ManyToOne(() => RoadmapEntity, (roadmap) => roadmap.rm_id)
    rm_id: RoadmapEntity;

    // @ManyToOne(() => RoadmapNodeEntity, (node) => node.childNode)
    // parentNode : RoadmapNodeEntity;

    // @OneToMany((type) => RoadmapNodeEntity, (node) => node.parentNode)
    // childNode : RoadmapNodeEntity[];
}