import { IsString } from 'class-validator';

export class PhotoDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  filename: string;

  views: number;
  isPublished: boolean;
}

export class PhotoRO {
  id: string;
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}
