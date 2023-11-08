import { Module } from '@nestjs/common';
import { VerifierController } from './controller/verifier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/service/answer.service';
import { ReportsAnswerService } from 'src/reports/service/answer/reports-answer.service';
import { ReportAnswer } from 'src/reports/entities/report-answer/report-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, ReportAnswer])
  ],
  controllers: [VerifierController],
  providers: [
    AnswerService,
    ReportsAnswerService
  ],
})
export class VerifierModule {}
