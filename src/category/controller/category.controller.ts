import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { CategoryDTO } from '../dto/category.dto';

@Controller('api')
@Serialize(CategoryDTO)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // create a new category
  @Post('category/:userID/create')
  async create(
    @Body() body: CreateCategoryDto, 
    @Param('userID') userID: string
  ): Promise<Category | null> {
    return await this.categoryService.create(userID, body);
  }

  // get all categories
  @Get('category')
  async findAll(): Promise<Category[] | null> {
    return await this.categoryService.findAll();
  }

  // 
  @Patch('category/:categoryID/update')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('category/:categoryId/delete')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
