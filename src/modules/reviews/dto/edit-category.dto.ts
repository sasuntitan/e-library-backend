import { IsNotEmpty } from 'class-validator';

export class EditCategoryDto {
  @IsNotEmpty()
  readonly name: string;
}
