import { IsNotEmpty, IsString } from 'class-validator';

export class EditPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
