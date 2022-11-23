import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '../models/book-status.model';

export class GetBooksRequestDto {
  title?: string;
  categories?: number[];

  @ApiProperty({ enum: BookStatus })
  status?: number;
}
