import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  filename: string;

  @Column('double precision')
  views: number;

  @Column()
  isPublished: boolean;

  @ManyToOne(type => UserEntity, author => author.photos)
  author: UserEntity;
}
