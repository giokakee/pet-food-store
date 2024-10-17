import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { MailModule } from '../mail/mail.module';
import { FileService } from 'src/services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), MailModule],
  providers: [ProductService, FileService],
  controllers: [ProductController],
})
export class ProductModule {}
