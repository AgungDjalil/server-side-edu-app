import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from '../service/tags.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { Tag } from '../entities/tag.entity';
import { Public } from 'src/decorators/public.decorator';
import { CurrentUserID } from 'src/decorators/currentUserID';

@Controller('api')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // get all tags (banned and suspended)
  @Roles(Role.Moderator)
  @Get('tags/all')
  async getAllTags() {
    return this.tagsService.getAll()
  }

  // get one tag
  @Public()
  @Get('tags/:tagID')
  async getOneTag(@Param('tagID') tagID: string) {
    return await this.tagsService.finOneByID(tagID)
  }

  // create new tags
  @Roles(Role.Moderator)
  @Post('tags/create')
  async create(@Body() body: CreateTagDto, @CurrentUserID() userID: string): Promise<Tag> {
    return await this.tagsService.create(body, userID);
  }

  // get all tags
  @Public()
  @Get('tags')
  async findAll(): Promise<Tag[] | null> {
    return await this.tagsService.findAll();
  }

  // update tag
  @Roles(Role.Moderator)
  @Patch('tags/:tagID/update')
  async findOne(@Param('tagID') tagID: string,@Body() body: UpdateTagDto): Promise<Tag> {
    return await this.tagsService.update(tagID, body);
  }

  // delete some tags
  @Roles(Role.Moderator)
  @Post('tags/:tagID/delete')
  async remove(@Param('tagID') tagID: string): Promise<string> {
    return await this.tagsService.remove(tagID);
  }
}
