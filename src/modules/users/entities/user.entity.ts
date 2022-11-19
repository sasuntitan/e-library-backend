import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { UserRole } from '../models/user-role.enum';

@Entity()
export class UserEntity extends BaseEntity {
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

  @Column({ nullable: true })
  profilePictureUrl?: string;

  constructor(data: Partial<UserEntity>) {
    super();
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
      this.role = data.role || UserRole.User;
      this.profilePictureUrl = data.profilePictureUrl;
    }
  }
}
