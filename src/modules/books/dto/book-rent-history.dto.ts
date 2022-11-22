import { UserModel } from 'src/modules/users/models/user.model';
import { BookModel } from '../models/book.model';

export class BookRentHistoryModel {
  id: number;
  createdDate: Date;
  endDate: Date;
  user: UserModel;
}

export class BookRentHistoryResponseDto {
  data: BookRentHistoryModel[];
  count: number;
}

export class UserRentHistoryModel {
  id: number;
  createdDate: Date;
  endDate: Date;
  book: BookModel;
}

export class UserRentHistoryResponseDto {
  data: UserRentHistoryModel[];
  count: number;
}
