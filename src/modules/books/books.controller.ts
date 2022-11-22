import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomAuthGuard } from '../auth/custom-auth.guard';

import { HasRoles } from '../shared/decorators/has-role.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';
import { BooksService } from './books.service';
import {
  BookRentHistoryResponseDto,
  UserRentHistoryResponseDto,
} from './dto/book-rent-history.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { GetBooksRequestDto } from './dto/get-books-request.dto';
import { GetBooksResponseDto } from './dto/get-books-response.dto';
import { HoldBookDto } from './dto/hold-book.dto';
import { BookModel } from './models/book.model';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  addBook(@Body() body: CreateBookDto) {
    return this.booksService.addBook(body);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post('hold')
  holdBook(@Body() body: HoldBookDto) {
    return this.booksService.holdBook(body);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post('unhold')
  unHoldBook(@Body() body: HoldBookDto) {
    return this.booksService.unHoldBook(body);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editBook(@Param('id') id: number, @Body() body: EditBookDto) {
    return this.booksService.editBook(id, body);
  }

  @Get()
  getBooks(@Query() query: GetBooksRequestDto): Promise<GetBooksResponseDto> {
    return this.booksService.getBooks(query);
  }

  @ApiBearerAuth()
  @UseGuards(CustomAuthGuard)
  @Get(':id')
  getBookById(@Param('id') id: number, @Request() req): Promise<BookModel> {
    const role = req.user ? req.user.role : UserRole.User;
    return this.booksService.getBookById(id, role);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/history')
  getBookHistory(@Param('id') id: number): Promise<BookRentHistoryResponseDto> {
    return this.booksService.getBookHistory(id);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('/history/:userId')
  getRentHistoryByUserId(
    @Param('userId') userId: number,
  ): Promise<UserRentHistoryResponseDto> {
    return this.booksService.getUserRentHistory(userId);
  }
}
