import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { UserModel } from 'src/modules/users/models/user.model';
import { BookStatus } from './book-status.model';

export class BookModel {
  id: number;

  title: string;

  description: string;

  author: string;

  pictureUrl: string | null;

  categories: CategoryEntity[];

  holdedUser?: UserModel;
}
