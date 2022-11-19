import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static';
import { join, resolve } from 'path';

import { ConfigEnum } from './config.enum';

@Injectable()
export class ServeStaticConfigService
  implements ServeStaticModuleOptionsFactory
{
  constructor(private readonly configService: ConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] {
    return [
      {
        serveRoot: join(
          '/',
          this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
          '/',
        ),
        rootPath: resolve(
          process.cwd(),
          this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
        ),
      },
    ];
  }
}
