import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../shared/decorators/has-role.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { GetCategoriesRequestDto } from './dto/get-categories-request.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  addCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.addCategory(body);
  }

  @Get()
  getCategories(@Query() query: GetCategoriesRequestDto) {
    return this.categoryService.getCategories(query);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editCategory(@Param('id') id: number, @Body() body: EditCategoryDto) {
    return this.categoryService.editCategory(id, body);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
