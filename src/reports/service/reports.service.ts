import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportUser } from '../entities/report-user.entity';
import { Repository } from 'typeorm';
import { ReportAnswer } from '../entities/report-answer.entity';
import { ReportQuestion } from '../entities/report-question.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportUser) private reportRepositoryUser: Repository<ReportUser>,
    @InjectRepository(ReportQuestion) private reportRepositoryQuestion: Repository<ReportQuestion>,
    @InjectRepository(ReportAnswer) private reportRepositoryAnswer: Repository<ReportAnswer>
  ) {}

  // async findAllUserReported(): Promise<ReportUser[] | null> {
  //   try {
  //     const reportedUser = await this.reportRepository.find({
  //       where: { reportedUser: true}
  //     })
  
  //     return reportedUser

  //   } catch (err) {
  //     return err.message
  //   }
  // }

  async createReportForAnswer(reportingUser: string, reportedAnswerID: string, body: CreateReportDto): Promise<ReportAnswer> {
    try {
      const report = this.reportRepositoryAnswer.create({
        reportingUser,
        reportedAnswerID,
        reportMessage: body.reportMessage
      })

      await this.reportRepositoryAnswer.save(report)

      return report

    } catch (err) {
      return err.message
    }
  }

  async createReportForQuestion(reportingUser: string, reportedQuestionID: string, body: CreateReportDto): Promise<ReportQuestion> {
    try {
      const report = this.reportRepositoryQuestion.create({
        reportingUser,
        reportedQuestionID,
        reportMessage: body.reportMessage
      })

      await this.reportRepositoryQuestion.save(report)

      return report

    } catch (err) {
      return err.message
    }
  }

  async createReporForUser(reportingUser: string, reportedUser: string, body: CreateReportDto): Promise<ReportUser> {
    try {
      const report = this.reportRepositoryUser.create({
        reportingUser,
        reportedUser,
        reportMessage: body.reportMessage
      })
  
      await this.reportRepositoryUser.save(report)
  
      return report;

    } catch (err) {
      return err.message
    }
  }
}
