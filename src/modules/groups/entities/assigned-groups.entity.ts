import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';
import { GroupEntity } from './groups.entity';

@Entity('AssignedGroup')
@Unique('UQ_assignments', ['userId', 'groupId'])
export class AssignedGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  userId: string;

  @JoinColumn()
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column()
  groupId: number;

  @JoinColumn()
  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
  })
  group: GroupEntity;

  @Column()
  admin: boolean;
}
