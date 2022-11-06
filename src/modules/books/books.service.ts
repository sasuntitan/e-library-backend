import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../shared/services/base.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService extends BaseService<BookEntity> {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {
    super(bookRepository);
  }

  async addBook(createBookDto: CreateBookDto) {}
}
