import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { PhotoMetadataEntity } from './photoMetadata.entity';

export const PHOTO_NAME_LENGTH = 100;
@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ length: PHOTO_NAME_LENGTH })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  filename: string;

  @Column('double precision')
  views: number;

  @Column({
    nullable: true,
  })
  isPublished: boolean;

  @OneToOne(type => PhotoMetadataEntity, metadata => metadata.photo, {
    cascade: true,
  })
  metadata: PhotoMetadataEntity;

  @ManyToOne(type => UserEntity, author => author.photos)
  author: UserEntity;
}
