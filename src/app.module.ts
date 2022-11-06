import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UsersModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
