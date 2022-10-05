import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {UserEntity} from "../../users/entities/users.entity";

@Entity('RoadMap')
export class RoadmapEntity {
    @PrimaryGeneratedColumn()
    rm_id: number;

    @Column({ length: 20 })
    rm_name: string;

    @Column()
    rm_description: string;
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;
}