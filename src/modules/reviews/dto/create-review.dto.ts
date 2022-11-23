import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  readonly review: string;

  @IsNotEmpty()
  readonly bookId: number;
}
