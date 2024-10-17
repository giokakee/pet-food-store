import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  // Generates a unique filename
  generateFileName(originalName: string): string {
    const fileExt = extname(originalName);
    const randomName = uuid(); // Use UUID for a unique file name
    return `${randomName}${fileExt}`;
  }

  // Returns Multer configuration for file uploads
  getMulterOptions(uploadPath: string) {
    return {
      storage: diskStorage({
        destination: uploadPath, // Path where files will be stored
        filename: (req, file, cb) => {
          const fileName = this.generateFileName(file.originalname);
          cb(null, fileName);
        },
      }),
    };
  }

  // Optional: Validates file type and size
  validateFile(file: Express.Multer.File) {
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      throw new Error('File is too large');
    }
  }
}
