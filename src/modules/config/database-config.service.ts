import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigEnum } from './config.enum';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(ConfigEnum.DATABASE_HOST),
      port: this.configService.get(ConfigEnum.DATABASE_PORT),
      username: this.configService.get(ConfigEnum.DATABASE_USERNAME),
      password: this.configService.get(ConfigEnum.DATABASE_PASSWORD),
      database: this.configService.get(ConfigEnum.DATABASE_NAME),
      entities: [process.cwd(), '**/*.entity.{js, ts}'],
      synchronize: true,
    };
  }
}
