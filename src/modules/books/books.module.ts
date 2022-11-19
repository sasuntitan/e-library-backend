import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from '../category/entities/category.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
