import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';

@Entity()
export class PhotoMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: string;

  @Column()
  comment: string;

  @OneToOne(type => PhotoEntity)
  @JoinColumn()
  photo: PhotoEntity;
}
