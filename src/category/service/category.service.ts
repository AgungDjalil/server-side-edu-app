import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async create(userID: string, body: CreateCategoryDto): Promise<Category | null> {
    const category = this.categoryRepository.create({
      userID,
      categoryName: body.categoryName
    })

    await this.categoryRepository.save(category);

    return category;
  }

  async findAll(): Promise<Category[] | null> {
    const categories = await this.categoryRepository.find()

    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
