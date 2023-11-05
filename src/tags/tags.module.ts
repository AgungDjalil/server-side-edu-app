import { Module } from '@nestjs/common';
import { TagsService } from './service/tags.service';
import { TagsController } from './controller/tags.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
