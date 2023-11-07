import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportUser } from './entities/report-user.entity';
import { ReportQuestion } from './entities/report-question.entity';
import { ReportAnswer } from './entities/report-answer.entity';
import { ReportsUserService } from './service/reports-user.service';
import { ReportsQuestionService } from './service/reports-question.service';
import { ReportsAnswerService } from './service/reports-answer.service';
import { ReportsUserController } from './controller/reports-user.controller';
import { ReportsQuestionController } from './controller/reports-question.controller';
import { ReportsAnswerController } from './controller/reports-answer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportUser, 
      ReportQuestion, 
      ReportAnswer
    ])
  ],
  controllers: [
    ReportsUserController,
    ReportsQuestionController,
    ReportsAnswerController
  ],
  providers: [
    ReportsUserService,
    ReportsQuestionService,
    ReportsAnswerService
  ],
  exports: [
    ReportsUserService,
    ReportsQuestionService
  ]
})
export class ReportsModule {}
