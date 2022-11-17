import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { validate } from 'class-validator';

import { ConfigEnum } from '../config/config.enum';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '../users/models/user-role.enum';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JWTTokenModel } from './models/jwt-token.model';
import { TokenPayloadModel } from './models/token-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(userData: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOne({ email: userData.email });
    if (user) {
      throw new BadRequestException('User with this email is already exists');
    }
    const userToSave = new UserEntity(userData);
    const errors = await validate(userToSave);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    userToSave.password = await hash(userData.password, 5);
    userToSave.role = UserRole.User;
    await this.usersService.add(userToSave);
    return {
      message: 'You have successfully registered!',
    };
  }

  public async signin(userData: LoginUserDto) {
    try {
      const user = await this.usersService.getByEmail(userData.email);
      if (user && (await compare(userData.password, user.password))) {
        const payload = new TokenPayloadModel(user.id, user.role);
        return this.signTokens(payload);
      }
      throw new UnauthorizedException('Invalid email or password');
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  private signTokens(payload: TokenPayloadModel): JWTTokenModel {
    return {
      access_token: this.jwtService.sign({ ...payload }),
      refresh_token: this.jwtService.sign(
        { ...payload },
        {
          expiresIn: this.configService.get(ConfigEnum.JWT_REFRESH_EXPIRE),
        },
      ),
    };
  }
}
