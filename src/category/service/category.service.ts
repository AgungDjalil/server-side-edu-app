import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async getAllCategory() {
    const category = await this.categoryRepository.find()
    return category
  }

  async findOneByID(categoryID: string) {
    const category = await this.categoryRepository.findOne({
      where: { categoryID }
    })

    return category
  }

  async update(userID: string, categoryID: string, body: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          categoryID,
          userID
        }
      })
  
      category.categoryName = body.categoryName
  
      await this.categoryRepository.save(category)
  
      return category;

    } catch (err) {
      return err.message
    }
  }

  async create(userID: string, body: CreateCategoryDto): Promise<Category | null> {
    try {
      const category = this.categoryRepository.create({
        userID,
        categoryName: body.categoryName
      })
  
      await this.categoryRepository.save(category);
  
      return category;

    } catch (err) {
      return err.message;
    }
  }

  async findAll(): Promise<Category[] | null> {
    const categories = await this.categoryRepository.find({
      where: { 
        isActive: true
      }
    })

    return categories;
  }

  async remove(categoryID: string): Promise<string> {
    try {
      const category = await this.categoryRepository.findOneById(categoryID)
      
      category.isActive = false
  
      await this.categoryRepository.save(category)
  
      return 'category successfully hide';

    } catch (err) {
      return err.message
    }
  }
}
