import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { MulterConfigService } from '../config/multer-config.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
