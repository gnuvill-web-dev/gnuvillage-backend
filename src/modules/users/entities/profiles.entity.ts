import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('Profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  userId: string;

  @JoinColumn()
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 40 })
  department: string;

  @Column({ length: 1000 })
  message: string;
}
