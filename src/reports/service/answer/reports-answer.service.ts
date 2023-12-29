import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportAnswer } from "../../entities/report-answer/report-answer.entity";
import { Repository } from "typeorm";
import { CreateReportDto } from "../../dto/create-report.dto";

@Injectable()
export class ReportsAnswerService {
    constructor(
        @InjectRepository(ReportAnswer) private reportRepositoryAnswer: Repository<ReportAnswer>
    ) { }

    async removeFromAnswerReportTable(reportID: string): Promise<boolean> {
        try {
          const user = await this.reportRepositoryAnswer.findOneById(reportID);
      
          user.isActive = false;
      
          await this.reportRepositoryAnswer.save(user)
      
          return true
    
        } catch (err) {
          return false
        }
    }

    async findAllReportedAnswer(): Promise<ReportAnswer[] | null> {
        try {
            const answer = await this.reportRepositoryAnswer.find({
                where: { isActive: true },
                relations: ['reportedAnswerID']
            })
    
            return answer  

        } catch (err) {
            return err.message
        }
    }

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
}