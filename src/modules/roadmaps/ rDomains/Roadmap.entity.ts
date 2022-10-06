import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import {UserEntity} from "../../users/entities/users.entity";
import { RoadmapNodeEntity } from './Roadmap_node.entity';

@Entity('RoadMap')
export class RoadmapEntity {
    @PrimaryGeneratedColumn()
    @OneToMany(() => RoadmapNodeEntity, (node) => node.rm_id)
    rm_id: number;

    @Column({ length: 20 })
    rm_name: string;

    @Column()
    rm_description: string;
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;
}