import { Module } from '@nestjs/common';
import { ReportsService } from './service/reports.service';
import { ReportsController } from './controller/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportUser } from './entities/report-user.entity';
import { ReportQuestion } from './entities/report-question.entity';
import { ReportAnswer } from './entities/report-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportUser, 
      ReportQuestion, 
      ReportAnswer
    ])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
