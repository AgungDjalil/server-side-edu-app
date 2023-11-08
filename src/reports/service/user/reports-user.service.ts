import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../../dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportUser } from '../../entities/report-user/report-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsUserService {
  constructor(
    @InjectRepository(ReportUser) private reportRepositoryUser: Repository<ReportUser>
  ) {}

  async removeFromUserReportTable(reportID: string): Promise<boolean> {
    try {
      const user = await this.reportRepositoryUser.findOneById(reportID);
  
      user.isActive = false;
  
      await this.reportRepositoryUser.save(user)
  
      return true

    } catch (err) {
      return false
    }
  }

  async findAllUserReported(): Promise<ReportUser[] | null> {
    try {
      const reportedUser = await this.reportRepositoryUser.find({
        where: { isActive: true }
      })
  
      return reportedUser

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
