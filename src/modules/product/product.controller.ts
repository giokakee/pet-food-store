import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { FileService } from 'src/services/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlinkSync } from 'fs';
import { UpdateProductDto } from './dto/update-product.dro';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('File format is not allowed!'),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() productData: any,
  ) {
    try {
      this.fileService.validateFile(file);

      const imageUrl = `uploads/${file.filename}`;

      return await this.productService.create({ ...productData, imageUrl });
    } catch (err) {
      if (file && file.path) {
        unlinkSync(file.path);
      }

      throw new BadRequestException('Fields are not valid');
    }
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async updateProduct(
    @Param('id') id,
    @Body() updateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    try {
      if (file) {
        if (product.imageUrl) {
          unlinkSync(product.imageUrl);
        }

        updateProductDto.imageUrl = `uploads/${file.filename}`;
      }

      const updatedProduct = await this.productService.update(
        id,
        updateProductDto,
      );

      return {
        message: 'Product updated succesfully',
        updatedProduct,
      };
    } catch (err) {
      if (file && file.path) {
        unlinkSync(file.path);
      }

      throw new BadRequestException('Faild to update product');
    }
  }
}
