import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Like, Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { ConfigEnum } from '../config/config.enum';

import { BaseService } from '../shared/services/base.service';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { GetBooksRequestDto } from './dto/get-books-request.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService extends BaseService<BookEntity> {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly configService: ConfigService,
  ) {
    super(bookRepository);
  }

  async addBook(createBookDto: CreateBookDto) {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: createBookDto.categoryIds })
      .getMany();

    const bookToSave = new BookEntity(createBookDto);
    bookToSave.categories = categories;
    await this.add(bookToSave);
  }

  async getBooks(getBooksRequestDto: GetBooksRequestDto) {
    const data = await this.bookRepository.findAndCount({
      where: {
        ...(getBooksRequestDto.title && {
          title: Like(`%${getBooksRequestDto.title}%`),
        }),
      },
    });
    return {
      data: data[0].map((b) => {
        if (b.pictureUrl !== null) {
          b.pictureUrl = join(
            '/',
            this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
            b.pictureUrl,
          );
        }
        return b;
      }),
      count: data[1],
    };
  }

  async editBook(id: number, editBookDto: EditBookDto) {
    const book = await this.findById(id);
    if (!book) {
      throw new NotFoundException();
    }

    book.pictureUrl = editBookDto.pictureUrl;
    book.title = editBookDto.title;
    book.description = editBookDto.description;
    book.author = editBookDto.author;
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: editBookDto.categoryIds })
      .getMany();
    book.categories = categories;
    await this.update(id, book);
    return book;
  }
}
