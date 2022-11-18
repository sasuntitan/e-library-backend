import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { resolve } from 'path';

import { ConfigEnum } from './config.enum';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: resolve(
          process.cwd(),
          this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
        ),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}.${
              file.originalname.split('.')[1]
            }`,
          );
        },
      }),
    };
  }
}
