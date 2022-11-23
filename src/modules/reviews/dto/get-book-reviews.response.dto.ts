import { ReviewModel } from '../models/review.model';

export class GetBookReviewsResponseDto {
  data: ReviewModel[];
  count: number;
}
