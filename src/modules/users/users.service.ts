import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Like, Repository } from 'typeorm';
import { ConfigEnum } from '../config/config.enum';

import { BaseService } from '../shared/services/base.service';
import { EditUserDto } from './dto/edit-user.dto';
import { GetUsersRequestDto } from './dto/get-users-request.dto';
import { UserEntity } from './entities/user.entity';
import { UserRole } from './models/user-role.enum';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super(userRepository);
  }

  async getUsers(getUsersRequestDto: GetUsersRequestDto) {
    const data = await this.userRepository.findAndCount({
      where: {
        role: UserRole.User,
        ...(getUsersRequestDto.name && {
          name: Like(`%${getUsersRequestDto.name}%`),
        }),
      },
      skip:
        getUsersRequestDto.page && getUsersRequestDto.pageSize
          ? (getUsersRequestDto.page - 1) * getUsersRequestDto.pageSize
          : undefined,
      take: getUsersRequestDto.pageSize,
    });
    return {
      data: data[0].map((u) => {
        u.profilePictureUrl = join(
          '/',
          this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
          u.profilePictureUrl,
        );
        return u;
      }),
      count: data[1],
    };
  }

  async getUserById(id: number) {
    const user = await this.findById(id);
    user.profilePictureUrl = join(
      '/',
      this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
      user.profilePictureUrl,
    );
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async editUser(id: number, editUserDto: EditUserDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    user.name = editUserDto.name;
    user.phoneNumber = editUserDto.phoneNumber;
    await this.update(id, user);
    return user;
  }

  async deleteUserById(id: number) {
    await this.delete(id);
  }

  async getByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }
}
