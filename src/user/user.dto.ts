import { IsNotEmpty } from 'class-validator';

import { PhotoEntity } from '../photo/photo.entity';
import { IdeaEntity } from '../idea/idea.entity';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  ideas?: IdeaEntity[];
  bookmarks?: IdeaEntity[];
  photos?: PhotoEntity[];
}
