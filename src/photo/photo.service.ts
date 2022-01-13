import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { PhotoDTO, PhotoRO } from './photo.dto';
import { PhotoEntity } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
    @InjectRepository(UserEntity)
    private userRespository: Repository<UserEntity>,
  ) {}

  private toResponseObject(photo: PhotoEntity): PhotoRO {
    const responseObject: any = {
      ...photo,
      author: photo.author.toResponseObject(false),
    };
    return responseObject;
  }

  private ensureOwnership(photo: PhotoEntity, userId: string) {
    if (photo.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(page = 1, newest?: boolean): Promise<PhotoRO[]> {
    const photos = await this.photoRepository.find({
      relations: ['author'],
      take: 25,
      skip: 25 * (page - 1),
      order: newest && { created: 'DESC' },
    });
    return photos.map(photo => this.toResponseObject(photo));
  }

  async create(userId: string, data: PhotoDTO): Promise<PhotoRO> {
    const user = await this.userRespository.findOne({ where: { id: userId } });
    const photo = this.photoRepository.create({ ...data, author: user });
    await this.photoRepository.save(photo);
    return this.toResponseObject(photo);
  }

  async read(id: string): Promise<PhotoRO> {
    const photo = await this.photoRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!photo) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(photo);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<PhotoDTO>,
  ): Promise<PhotoRO> {
    let photo = await this.photoRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!photo) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(photo, userId);
    await this.photoRepository.update({ id }, data);
    photo = await this.photoRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return this.toResponseObject(photo);
  }

  async delete(id: string, userId: string) {
    const photo = await this.photoRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!photo) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(photo, userId);
    await this.photoRepository.delete(id);
    return this.toResponseObject(photo);
  }
}
