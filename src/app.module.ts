import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from './modules/config/config.module';
import { ServeStaticConfigService } from './modules/config/serve-static-config.service';
import { DatabaseModule } from './modules/database/database.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    BooksModule,
    CategoryModule,
    UploadModule,
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
