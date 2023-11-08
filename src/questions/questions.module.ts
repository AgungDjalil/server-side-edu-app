import { Module } from '@nestjs/common';
import { QuestionsService } from './service/questions.service';
import { QuestionsController } from './controller/questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { ReportsQuestionService } from 'src/reports/service/question/reports-question.service';
import { ReportQuestion } from 'src/reports/entities/report-question/report-question.entity';
import { ReportAnswer } from 'src/reports/entities/report-answer/report-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question, 
      Answer, 
      ReportQuestion
    ]),
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    ReportsQuestionService
  ],
})
export class QuestionsModule {}
