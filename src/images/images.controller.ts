import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { Helper } from '../shared/helper';

const options: MulterOptions = {
  fileFilter: Helper.imageFileFilter,
  storage: diskStorage({
    destination: Helper.destinationPath,
    filename: Helper.customFilename,
  }),
};

@Controller('images')
export class ImagesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: Helper.imageFileFilter,
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFilename,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('image[]', 20, options))
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response = [];
    files.forEach(file => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: './images' });
  }
}
