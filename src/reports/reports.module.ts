import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportUser } from './entities/report-user/report-user.entity';
import { ReportQuestion } from './entities/report-question/report-question.entity';
import { ReportAnswer } from './entities/report-answer/report-answer.entity';
import { ReportsUserService } from './service/user/reports-user.service';
import { ReportsQuestionService } from './service/question/reports-question.service';
import { ReportsAnswerService } from './service/answer/reports-answer.service';
import { ReportsUserController } from './controller/user/reports-user.controller';
import { ReportsQuestionController } from './controller/question/reports-question.controller';
import { ReportsAnswerController } from './controller/answer/reports-answer.controller';
import { ReportComment } from './entities/report-comment/report-comment.entity';
import { ReportCommentController } from './controller/comment/report-comment.controller';
import { ReportsCommentService } from './service/comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportUser, 
      ReportQuestion, 
      ReportAnswer,
      ReportComment
    ])
  ],
  controllers: [
    ReportsUserController,
    ReportsQuestionController,
    ReportsAnswerController,
    ReportCommentController
  ],
  providers: [
    ReportsUserService,
    ReportsQuestionService,
    ReportsAnswerService,
    ReportsCommentService
  ],
  exports: [
    ReportsUserService,
    ReportsQuestionService,
    ReportsAnswerService,
    ReportsCommentService
  ]
})
export class ReportsModule {}
