import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsArray()
  readonly categoryIds: number[];

  @IsString()
  profilePictureUrl?: string;
}
