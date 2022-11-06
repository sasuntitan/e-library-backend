import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { IUser } from '../models/user.model';
import { UserRole } from '../models/user-role.enum';

@Entity()
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  role: UserRole;

  @IsMobilePhone('am-AM')
  @IsNotEmpty()
  @Column()
  public phoneNumber: string;

  constructor(data: IUser) {
    super();
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
    }
  }
}
