import { CategoryEntity } from '../entities/category.entity';

export class GetCategoriesResponseDto {
  data: CategoryEntity[];
  count: number;
}
