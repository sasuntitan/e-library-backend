import { IsNotEmpty, IsNumber } from 'class-validator';

export class HoldBookDto {
  @IsNotEmpty()
  @IsNumber()
  readonly bookId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
