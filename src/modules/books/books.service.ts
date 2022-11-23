import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';

import { BaseService } from '../shared/services/base.service';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '../users/models/user-role.enum';
import {
  BookRentHistoryModel,
  BookRentHistoryResponseDto,
  UserRentHistoryModel,
  UserRentHistoryResponseDto,
} from './dto/book-rent-history.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { GetBooksRequestDto } from './dto/get-books-request.dto';
import { HoldBookDto } from './dto/hold-book.dto';
import { BookEntity } from './entities/book.entity';
import { UserBookEntity } from './entities/user-book.entity';
import { BookStatus } from './models/book-status.model';
import { BookModel } from './models/book.model';

@Injectable()
export class BooksService extends BaseService<BookEntity> {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserBookEntity)
    private readonly userBookRepository: Repository<UserBookEntity>,
    private readonly configService: ConfigService,
  ) {
    super(bookRepository);
  }

  async addBook(createBookDto: CreateBookDto) {
    const categories = await this.categoryRepository.findBy({
      id: In(createBookDto.categoryIds),
    });

    const bookToSave = new BookEntity(createBookDto);
    bookToSave.categories = categories;
    await this.add(bookToSave);
  }

  async holdBook(holdBookDto: HoldBookDto) {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .where('book.id = :id', { id: holdBookDto.bookId })
      .leftJoinAndSelect(
        'book.userBooks',
        'userBooks',
        'userBooks.bookId = book.id AND userBooks.endDate is null',
      );

    const book = await query.getOne();

    if (!book) {
      throw new NotFoundException();
    }

    if (book.userBooks.length) {
      throw new BadRequestException('Book is already taken');
    }

    const user = await this.usersRepository.findOneBy({
      id: holdBookDto.userId,
    });
    if (!user) {
      throw new NotFoundException();
    }
    const userBookEntity = new UserBookEntity();
    userBookEntity.book = book;
    userBookEntity.user = user;
    await this.userBookRepository.save(userBookEntity);
  }

  async unHoldBook(holdBookDto: HoldBookDto) {
    const entity = await this.userBookRepository.findOneBy({
      bookId: holdBookDto.bookId,
      userId: holdBookDto.userId,
      endDate: IsNull(),
    });

    if (!entity) {
      throw new BadRequestException();
    }

    entity.endDate = new Date();
    await this.userBookRepository.update(entity.bookToUserId, entity);
  }

  async getBooks(getBooksRequestDto: GetBooksRequestDto) {
    const query = this.bookRepository.createQueryBuilder('book');

    if (getBooksRequestDto.title) {
      query.andWhere('book.title LIKE :title', {
        title: `%${getBooksRequestDto.title}%`,
      });
    }

    if (getBooksRequestDto.categories) {
      const categoryIds =
        getBooksRequestDto.categories.length == 1
          ? [+getBooksRequestDto.categories[0]]
          : getBooksRequestDto.categories.map((c) => +c);
      query.innerJoinAndSelect(
        'book.categories',
        'category',
        'category.id IN (:...categoryIds)',
        { categoryIds },
      );
    } else {
      query.leftJoinAndSelect('book.categories', 'category');
    }

    const data = await query
      .leftJoinAndSelect(
        'book.userBooks',
        'userBooks',
        'userBooks.bookId = book.id AND userBooks.endDate is null',
      )
      .leftJoinAndSelect('userBooks.user', 'user')
      .getManyAndCount();

    if (
      getBooksRequestDto.status === BookStatus[BookStatus.Hold as keyof any]
    ) {
      data[0] = data[0].filter((item) => !!item.userBooks.length);
    } else if (
      getBooksRequestDto.status ===
      BookStatus[BookStatus.Available as keyof any]
    ) {
      data[0] = data[0].filter((item) => !item.userBooks.length);
    }

    return {
      data: data[0].map((item) => {
        return {
          id: item.id,
          author: item.author,
          description: item.description,
          categories: item.categories,
          holdedUser: item.userBooks[0]?.user,
          pictureUrl: item.pictureUrl,
          status:
            item.userBooks.length == 0 ? BookStatus.Available : BookStatus.Hold,
          title: item.title,
        } as BookModel;
      }),
      count: data[1],
    };
  }

  async getBookById(id: number, role: UserRole) {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect(
        'book.userBooks',
        'userBooks',
        'userBooks.bookId = book.id AND userBooks.endDate is null',
      )
      .leftJoinAndSelect('userBooks.user', 'user')
      .leftJoinAndSelect('book.categories', 'categories')
      .where('book.id = :id', { id });

    const data = await query.getOne();
    if (!data) {
      throw new NotFoundException();
    }

    return {
      id: data.id,
      author: data.author,
      categories: data.categories,
      description: data.description,
      holdedUser: role === UserRole.Admin ? data.userBooks[0]?.user : null,
      pictureUrl: data.pictureUrl,
      status:
        data.userBooks.length == 0 ? BookStatus.Available : BookStatus.Hold,
      title: data.title,
    } as BookModel;
  }

  async getBookHistory(id: number) {
    const data = await this.userBookRepository.findAndCount({
      where: {
        bookId: id,
      },
      order: {
        createdAt: 'ASC',
      },
      relations: ['user'],
    });
    if (!data) {
      throw new NotFoundException();
    }

    return {
      data: data[0].map((item) => {
        return {
          id: item.bookToUserId,
          createdDate: item.createdAt,
          endDate: item.endDate,
          user: item.user,
        } as BookRentHistoryModel;
      }),
      count: data[1],
    } as BookRentHistoryResponseDto;
  }

  async getUserRentHistory(userId: number) {
    const data = await this.userBookRepository.findAndCount({
      where: {
        userId: userId,
      },
      order: {
        createdAt: 'ASC',
      },
      relations: ['book', 'book.categories'],
    });
    if (!data) {
      throw new NotFoundException();
    }

    return {
      data: data[0].map((item) => {
        return {
          id: item.bookToUserId,
          createdDate: item.createdAt,
          endDate: item.endDate,
          book: item.book,
        } as UserRentHistoryModel;
      }),
      count: data[1],
    } as UserRentHistoryResponseDto;
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
    const categories = await this.categoryRepository.findBy({
      id: In(editBookDto.categoryIds),
    });
    book.categories = categories;
    await this.update(id, book);
    return book as BookModel;
  }
}
