import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { DatabaseConfigService } from './database-config.service';
import { JWTConfigService } from './jwt-config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [JWTConfigService, DatabaseConfigService],
  exports: [JWTConfigService, DatabaseConfigService],
})
export class ConfigModule {}
