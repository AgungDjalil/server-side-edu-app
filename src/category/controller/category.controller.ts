import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { CategoryDTO } from '../dto/category.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { Public } from 'src/decorators/public.decorator';

@Controller('api')
@Serialize(CategoryDTO)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // get one category
  @Public()
  @Get('category/:categoryID')
  async getOneCategory(@Param('categoryID') categoryID: string) {
    return this.categoryService.findOneByID(categoryID)
  }

  // create a new category
  @Roles(Role.Moderator)
  @Post('category/user/create')
  async create(
    @Body() body: CreateCategoryDto, 
    @CurrentUserID() userID: string
  ): Promise<Category | null> {
    return await this.categoryService.create(userID, body);
  }

  // get all categories
  @Public()
  @Get('category')
  async findAll(): Promise<Category[] | null> {
    return await this.categoryService.findAll();
  }

  // route for edit category
  @Roles(Role.Moderator)
  @Patch('category/:categoryID/update')
  async update(
    @CurrentUserID() userID: string, 
    @Param('categoryID') categoryID: string, 
    @Body() body: UpdateCategoryDto
  ): Promise<Category> {
    return await this.categoryService.update(userID, categoryID, body);
  }

  // route for delete category
  @Roles(Role.Moderator)
  @Delete('category/:categoryID/delete')
  async remove(@Param('categoryID') categoryID: string): Promise<string> {
    return await this.categoryService.remove(categoryID);
  }
}
