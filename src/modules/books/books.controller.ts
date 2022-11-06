import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../shared/decorators/has-role.decorator';
import { UserRole } from '../users/models/user-role.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

// @ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @HasRoles(UserRole.Admin)
  // @UseGuards(RolesGuard)
  @Post()
  addBook(@Body() body: CreateBookDto) {
    return this.booksService.addBook(body);
  }
}
