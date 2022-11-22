import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from '../category/entities/category.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookEntity } from './entities/book.entity';
import { UserBookEntity } from './entities/user-book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      CategoryEntity,
      UserEntity,
      UserBookEntity,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
