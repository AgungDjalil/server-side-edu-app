import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReportQuestion } from "../../entities/report-question/report-question.entity";
import { CreateReportDto } from "../../dto/create-report.dto";

@Injectable()
export class ReportsQuestionService {
    constructor(
        @InjectRepository(ReportQuestion) private reportRepositoryQuestion: Repository<ReportQuestion>
    ) { }

    async removeFromQuestionReportTable(reportID: string): Promise<boolean> {
        try {
          const user = await this.reportRepositoryQuestion.findOneById(reportID);
      
          user.isActive = false;
      
          await this.reportRepositoryQuestion.save(user)
      
          return true
    
        } catch (err) {
          return false
        }
    }

    async findAllReportQuestions(): Promise<ReportQuestion[]> {
        try {
            const question = await this.reportRepositoryQuestion.find({
                where: { isActive: true },
                relations: ['reportedQuestionID']
            })

            return question

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
}