import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async create(body: CreateTagDto): Promise<Tag> {
    try {
      const tag = this.tagRepository.create({ 
        tagName: body.tagName,
        categoryID: body.categoryID
      })
  
      await this.tagRepository.save(tag)

      return tag;

    } catch (err) {
      return err.message;
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      const tag = await this.tagRepository.find({
        where: {
          isActive: true
        }
      })
  
      return tag;

    } catch (err) {
      return err.message;
    }
  }

  async update(tagID: string, body: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneById(tagID);

      tag.tagName = body.tagName
      tag.categoryID = body.categoryID

      await this.tagRepository.save(tag)
      
      return tag;

    } catch (err) {
      return err.message
    }
  }

  async remove(tagID: string): Promise<string> {
    try {
      const tag = await this.tagRepository.findOneById(tagID)
      
      tag.isActive = false

      await this.tagRepository.save(tag)

      return 'user successfully hide';

    } catch (err) {
      return err.message
    }
  }
}
