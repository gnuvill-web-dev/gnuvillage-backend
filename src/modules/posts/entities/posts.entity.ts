import { GroupEntity } from '../../groups/entities/groups.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';

@Entity('Post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  userId: string;

  @JoinColumn()
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ nullable: true })
  groupId: number;

  @JoinColumn()
  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
  })
  group: GroupEntity;

  @Column({ length: 60 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;

  @Column({ nullable: true, length: 20 })
  category: string;

  @Column()
  admin: boolean;
}
