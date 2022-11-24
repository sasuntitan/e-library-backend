import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploadDto } from './dto/file-upload.dto';
import { FileUploadResponseDto } from './dto/file-upload-response.dto';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../config/config.enum';

@ApiBearerAuth()
@ApiTags('file-upload')
@Controller('file-upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file to upload',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return new FileUploadResponseDto(
      file.originalname,
      join(
        '/',
        this.configService.get(ConfigEnum.UPLOAD_DESTINATION),
        file.filename,
      ),
    );
  }
}
