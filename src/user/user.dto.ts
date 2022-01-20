import { IsNotEmpty } from 'class-validator';

import { PhotoEntity } from '../photo/photo.entity';
import { IdeaEntity } from '../idea/idea.entity';
import { Role } from 'src/shared/role.enum';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  roles?: Role[];
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
