import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async getAll() {
    const tags = await this.tagRepository.find()
    return tags
  }

  async finOneByID(tagID: string) {
    const tag = await this.tagRepository.findOne({
      where: { tagID }
    })

    return tag
  }

  async create(body: CreateTagDto, userID: string): Promise<Tag> {
    try {
      const tag = this.tagRepository.create({ 
        tagName: body.tagName,
        userID
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

      return 'tag successfully hide';

    } catch (err) {
      return err.message
    }
  }
}
