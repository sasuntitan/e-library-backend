import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ConfigEnum } from './config.enum';

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      publicKey: this.extractPublicKey(),
      privateKey: this.extractPrivateKey(),
      signOptions: {
        algorithm: this.configService.get(ConfigEnum.JWT_SIGN_ALGORITHM),
        expiresIn: this.configService.get(ConfigEnum.JWT_EXPIRE),
      },
    };
  }

  public extractPublicKey(): string {
    try {
      return readFileSync(resolve(process.cwd(), 'jwtRS256.key.pub'), {
        encoding: 'utf8',
      });
    } catch (err) {
      console.log(err);
      return '';
    }
  }

  public extractPrivateKey(): string {
    try {
      return readFileSync(resolve(process.cwd(), 'jwtRS256.key'), {
        encoding: 'utf8',
      });
    } catch (err) {
      console.log(err);
      return '';
    }
  }
}
