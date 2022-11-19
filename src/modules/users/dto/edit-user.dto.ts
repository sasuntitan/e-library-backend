import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly profilePictureUrl?: string;

  @IsNotEmpty()
  @IsMobilePhone('am-AM')
  readonly phoneNumber: string;
}
