import { Module } from '@nestjs/common';
import { QuestionsService } from './service/questions.service';
import { QuestionsController } from './controller/questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { AnswerService } from 'src/answer/service/answer.service';
import { Answer } from 'src/answer/entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, AnswerService],
})
export class QuestionsModule {}
