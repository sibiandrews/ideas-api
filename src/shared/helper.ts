import { Request } from 'express';

export class Helper {
  static customFilename(
    req: Request,
    file: Express.Multer.File,
    callback: any,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    }
    const originalName = file.originalname.split('.')[0];
    callback(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }

  static destinationPath(
    req: Request,
    file: Express.Multer.File,
    callback: any,
  ) {
    callback(null, './images');
  }

  static imageFileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: any,
  ) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  }
}
