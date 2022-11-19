import { BookEntity } from '../entities/book.entity';

export class GetBooksResponseDto {
  data: BookEntity[];
  count: number;
}
