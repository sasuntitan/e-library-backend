import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';

import { BaseService } from '../shared/services/base.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService extends BaseService<BookEntity> {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(BookEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(bookRepository);
  }

  async addBook(createBookDto: CreateBookDto) {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: createBookDto.categoryIds })
      .getMany();

    console.log(categories);

    const bookToSave = new BookEntity(createBookDto, categories);

    await this.add(bookToSave);
  }
}
