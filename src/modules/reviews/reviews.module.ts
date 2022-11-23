import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewEntity } from './entities/review.entity';
import { BookEntity } from '../books/entities/book.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, BookEntity, UserEntity])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
