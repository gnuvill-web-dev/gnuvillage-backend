import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';
import { PostEntity } from './posts.entity';
import { GroupEntity } from '../../groups/entities/groups.entity';

@Entity('Reply')
export class ReplyEntity {
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
  postId: number;

  @JoinColumn()
  @ManyToOne(() => PostEntity, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;

  @Column({ nullable: true })
  groupId: number;

  @JoinColumn()
  @ManyToOne(() => GroupEntity, {
    onDelete: 'CASCADE',
  })
  group: GroupEntity;

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
}
