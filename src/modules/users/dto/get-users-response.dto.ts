import { UserEntity } from '../entities/user.entity';

export class GetUsersResponseDto {
  data: UserEntity[];
  count: number;
}
