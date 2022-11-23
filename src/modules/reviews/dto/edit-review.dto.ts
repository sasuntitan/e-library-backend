import { IsNotEmpty } from 'class-validator';

export class EditReviewDto {
  @IsNotEmpty()
  readonly review: string;

  @IsNotEmpty()
  readonly bookId: number;
}
