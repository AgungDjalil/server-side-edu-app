import { Module } from '@nestjs/common';
import { AnswerService } from './service/answer.service';
import { AnswerController } from './controller/answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { ReportsAnswerService } from 'src/reports/service/answer/reports-answer.service';
import { ReportAnswer } from 'src/reports/entities/report-answer/report-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      ReportAnswer
    ])
  ],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    ReportsAnswerService
  ],
  exports: [
    AnswerService
  ]
})
export class AnswerModule {}
