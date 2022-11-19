import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../shared/decorators/has-role.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { GetBooksRequestDto } from './dto/get-books-request.dto';
import { GetBooksResponseDto } from './dto/get-books-response.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  addBook(@Body() body: CreateBookDto) {
    return this.booksService.addBook(body);
  }

  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  editCategory(@Param('id') id: number, @Body() body: EditBookDto) {
    return this.booksService.editBook(id, body);
  }

  @Get()
  getBooks(@Query() query: GetBooksRequestDto): Promise<GetBooksResponseDto> {
    return this.booksService.getBooks(query);
  }
}
