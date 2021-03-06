import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserRO } from './user.dto';
import { IdeaEntity } from '../idea/idea.entity';
import { PhotoEntity } from '../photo/photo.entity';
import { Role } from '../shared/role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @Column('text', { array: true, nullable: true })
  roles: Role[];

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @OneToMany(type => PhotoEntity, photo => photo.author)
  photos: PhotoEntity[];

  @ManyToMany(type => IdeaEntity, { cascade: true })
  @JoinTable()
  bookmarks: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken = true): UserRO {
    const { id, created, username, token, roles } = this;
    const responseObject: any = { id, created, username, roles };
    if (showToken) {
      responseObject.token = token;
    }
    if (this.ideas) {
      responseObject.ideas = this.ideas;
    }
    if (this.bookmarks) {
      responseObject.bookmarks = this.bookmarks;
    }
    if (this.photos) {
      responseObject.photos = this.photos;
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username, roles } = this;
    return jwt.sign(
      {
        id,
        username,
        roles,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
