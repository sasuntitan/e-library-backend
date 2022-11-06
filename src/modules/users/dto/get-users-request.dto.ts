import { PaginatedRequestDto } from 'src/modules/shared/models/paginated-request.dto';

export class GetUsersRequestDto extends PaginatedRequestDto {
  name?: string;
}
