import { Module } from '@nestjs/common';
import { AnswerService } from './service/answer.service';
import { AnswerController } from './controller/answer.controller';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
