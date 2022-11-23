import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../shared/services/base.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { BookEntity } from '../books/entities/book.entity';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from '../users/entities/user.entity';
import { GetBookReviewsResponseDto } from './dto/get-book-reviews.response.dto';
import { EditReviewDto } from './dto/edit-review.dto';
import { TokenPayloadModel } from '../auth/models/token-payload.model';
import { UserRole } from '../users/models/user-role.enum';
import { ReviewModel } from './models/review.model';

@Injectable()
export class ReviewsService extends BaseService<ReviewEntity> {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super(reviewRepository);
  }

  async addReview(createReviewDto: CreateReviewDto, userId: number) {
    const book = await this.booksRepository.findOneBy({
      id: createReviewDto.bookId,
    });
    if (!book) {
      throw new BadRequestException('Book does not exist.');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });

    const reviewToSave = new ReviewEntity();
    reviewToSave.book = book;
    reviewToSave.user = user;
    reviewToSave.review = createReviewDto.review;

    return this.add(reviewToSave) as Promise<ReviewModel>;
  }

  async getBookReviews(bookId: number) {
    const book = this.booksRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException();
    }

    const data = await this.reviewRepository.findAndCount({
      where: {
        bookId: bookId,
      },
      relations: ['user'],
    });

    return {
      data: data[0],
      count: data[1],
    } as GetBookReviewsResponseDto;
  }

  async editReview(
    id: number,
    editReviewDto: EditReviewDto,
    user: TokenPayloadModel,
  ) {
    const review = await this.findById(id);
    if (!review) {
      throw new NotFoundException();
    }

    if (user.role === UserRole.Admin || user.sub === review.userId) {
      review.review = editReviewDto.review;
      await this.update(id, review);
      return review as ReviewModel;
    }
    throw new ForbiddenException();
  }

  async deleteReview(id: number, user: TokenPayloadModel) {
    const review = await this.findById(id);
    if (!review) {
      throw new NotFoundException();
    }
    if (user.role === UserRole.Admin || user.sub === review.userId) {
      await this.delete(id);
    }
    throw new ForbiddenException();
  }
}
