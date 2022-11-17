import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsMobilePhone('am-AM')
  readonly phoneNumber: string;
}
