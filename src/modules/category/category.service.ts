import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { BaseService } from '../shared/services/base.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { GetCategoriesRequestDto } from './dto/get-categories-request.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }

  async addCategory(createCategoryDto: CreateCategoryDto) {
    const existing = await this.findOne({ name: createCategoryDto.name });
    if (existing) {
      throw new BadRequestException(
        'Category with this name is already exists',
      );
    }
    const categoryToSave = new CategoryEntity(createCategoryDto);
    await this.add(categoryToSave);
  }

  async getCategories(getCategoriesRequestDto: GetCategoriesRequestDto) {
    return this.categoryRepository.findAndCount({
      where: {
        ...(getCategoriesRequestDto.name && {
          name: Like(`%${getCategoriesRequestDto.name}%`),
        }),
      },
    });
  }

  async getCategoryById(id: number) {
    const category = await this.findById(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async editCategory(id: number, editCategoryDto: EditCategoryDto) {
    const category = await this.findById(id);
    if (!category) {
      throw new NotFoundException();
    }

    category.name = editCategoryDto.name;
    await this.update(id, category);
    return category;
  }

  async deleteCategory(id: number) {
    await this.delete(id);
  }
}
