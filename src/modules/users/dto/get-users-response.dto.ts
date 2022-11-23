import { UserModel } from '../models/user.model';

export class GetUsersResponseDto {
  data: UserModel[];
  count: number;
}
