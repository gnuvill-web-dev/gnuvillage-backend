import { RoadmapNodeEntity } from './Roadmap_node.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

@Entity('NodeConnection')
export class NodeConnection {
    @PrimaryGeneratedColumn()
    conn_id: bigint;

    @Column()
    @ManyToOne(() => RoadmapNodeEntity, {createForeignKeyConstraints: false})
    conn_front: bigint;

    @Column()
    @ManyToOne(() => RoadmapNodeEntity, {createForeignKeyConstraints: false})
    conn_back: bigint;
}