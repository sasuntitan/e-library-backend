import { UserModel } from 'src/modules/users/models/user.model';

export class ReviewModel {
  id: number;
  created_at: Date;
  updated_at: Date;
  review: string;
  bookId: number;
  user: UserModel;
}
