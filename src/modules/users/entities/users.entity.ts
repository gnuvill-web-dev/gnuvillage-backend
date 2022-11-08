import { AssignedGroupEntity } from 'src/modules/groups/entities/assigned-groups.entity';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn({ length: 20 })
  id: string;

  @Column({ length: 60 })
  password: string;
}
