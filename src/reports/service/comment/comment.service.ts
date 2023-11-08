import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReportDto } from "../../dto/create-report.dto";
import { ReportComment } from "src/reports/entities/report-comment/report-comment.entity"; 

@Injectable()
export class ReportsCommentService {
    constructor(
        @InjectRepository(ReportComment) private reportRepositoryComment: Repository<ReportComment>
    ) { }

    async removeFromCommentReportTable(reportID: string): Promise<boolean> {
        try {
          const user = await this.reportRepositoryComment.findOneById(reportID);
      
          user.isActive = false;
      
          await this.reportRepositoryComment.save(user)
      
          return true
    
        } catch (err) {
          return false
        }
    }

    async findAllReportedComment(): Promise<ReportComment[] | null> {
        try {
            const comment = await this.reportRepositoryComment.find({
                where: { isActive: true }
            })
    
            return comment 

        } catch (err) {
            return err.message
        }
    }

    async createReportForComment(reportingUser: string, reportedCommentID: string, body: CreateReportDto): Promise<ReportComment> {
        try {
            const report = this.reportRepositoryComment.create({
                reportingUser,
                reportedCommentID,
                reportMessage: body.reportMessage
            })

            await this.reportRepositoryComment.save(report)

            return report

        } catch (err) {
            return err.message
        }
    }
}