import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Group')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 1000 })
  description: string;
}
