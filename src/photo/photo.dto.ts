import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { PHOTO_NAME_LENGTH } from './photo.entity';

export class PhotoMetadataDTO {
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsBoolean()
  @IsNotEmpty()
  compressed: boolean;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  orientation: string;
}
export class PhotoDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(PHOTO_NAME_LENGTH)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsNumber()
  @IsNotEmpty()
  views: number;

  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PhotoMetadataDTO)
  metadata: PhotoMetadataDTO;
}

export class PhotoRO {
  id: string;
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}

export class PhotoMetadataRO {
  height: number;
  width: number;
  compressed: boolean;
  comment: string;
  orientation: string;
}
