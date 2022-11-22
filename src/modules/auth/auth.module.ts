import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWTConfigService } from '../config/jwt-config.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CustomAuthGuard } from './custom-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
  ],
  providers: [AuthService, JwtStrategy, CustomAuthGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
