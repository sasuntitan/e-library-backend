import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly author: string;
}
