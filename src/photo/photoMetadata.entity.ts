import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PhotoEntity } from './photo.entity';

@Entity('photo_metadata')
export class PhotoMetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @OneToOne(type => PhotoEntity, photo => photo.metadata, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  photo: PhotoEntity;
}
