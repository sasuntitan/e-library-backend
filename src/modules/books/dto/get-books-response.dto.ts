import { BookModel } from '../models/book.model';

export class GetBooksResponseDto {
  data: BookModel[];
  count: number;
}
