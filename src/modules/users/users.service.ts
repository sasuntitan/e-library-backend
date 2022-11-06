import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { BaseService } from '../shared/services/base.service';
import { GetUsersRequestDto } from './dto/get-users-request.dto';
import { UserEntity } from './entities/user.entity';
import { UserRole } from './models/user-role.enum';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async getUsers(getUsersRequestDto: GetUsersRequestDto) {
    return this.userRepository.findAndCount({
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
  }

  async getByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }
}
