import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsMobilePhone('am-AM')
  readonly phoneNumber: string;

  @IsString()
  readonly profilePictureUrl?: string;
}
