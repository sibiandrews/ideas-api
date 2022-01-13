import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { ValidationPipe } from '../shared/validation.pipe';
import { User } from '../user/user.decorator';
import { PhotoDTO } from './photo.dto';
import { PhotoService } from './photo.service';

@Controller('api/photos')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  showAllPhotos(@Query('page') page: number) {
    return this.photoService.showAll(page);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createPhoto(@User('id') user: string, @Body() data: PhotoDTO) {
    return this.photoService.create(user, data);
  }

  @Get(':id')
  readPhoto(@Param('id') id: string) {
    return this.photoService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updatePhoto(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<PhotoDTO>,
  ) {
    return this.photoService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deletePhoto(@Param('id') id: string, @User('id') user: string) {
    return this.photoService.delete(id, user);
  }
}
