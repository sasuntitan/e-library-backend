import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JWTTokenModel } from './models/jwt-token.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'Signed up' })
  public signUpUser(@Body() body: CreateUserDto): Promise<any> {
    return this.authService.signup(body);
  }

  @Post('signin')
  @ApiCreatedResponse({ description: 'Signed in' })
  public signInUser(@Body() body: LoginUserDto): Promise<JWTTokenModel> {
    return this.authService.signin(body);
  }
}
