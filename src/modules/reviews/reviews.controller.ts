import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { EditReviewDto } from './dto/edit-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  addReview(@Body() body: CreateReviewDto, @Request() req) {
    return this.reviewsService.addReview(body, req.user.id);
  }

  @Get('books/:bookId')
  getBookReviews(@Param('bookId') bookId: number) {
    return this.reviewsService.getBookReviews(bookId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editReview(
    @Param('id') id: number,
    @Body() body: EditReviewDto,
    @Request() req,
  ) {
    return this.reviewsService.editReview(id, body, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteReview(@Param('id') id: number, @Request() req) {
    return this.reviewsService.deleteReview(id, req.user);
  }
}
