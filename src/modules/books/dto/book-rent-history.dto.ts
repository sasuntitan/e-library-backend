import { UserModel } from 'src/modules/users/models/user.model';

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
