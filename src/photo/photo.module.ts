import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoEntity } from './photo.entity';
import { PhotoMetadataEntity } from './photoMetadata.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhotoEntity, PhotoMetadataEntity, UserEntity]),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
