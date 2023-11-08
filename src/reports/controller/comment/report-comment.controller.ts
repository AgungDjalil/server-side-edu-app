import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CurrentUserID } from "src/decorators/currentUserID";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";
import { CreateReportDto } from "src/reports/dto/create-report.dto";
import { ReportComment } from "src/reports/entities/report-comment/report-comment.entity";
import { ReportsCommentService } from "src/reports/service/comment/comment.service";

@Controller('api')
export class ReportCommentController {
    constructor(private readonly reportsCommentService: ReportsCommentService) { }

    // route for get lla reprted comments
    @Roles(Role.Admin)
    @Get('reports/comments')
    async findAllReportedAnswer(): Promise<ReportComment[] | null> {
        return await this.reportsCommentService.findAllReportedComment()
    }

    // route for report comment
    @Post('reports/comment/:reportedCommentID/create')
    async createReportForAnswer(
        @CurrentUserID() userID: string,
        @Param('reportedAnswerID') reportedAnswerID: string,
        @Body() body: CreateReportDto
    ): Promise<ReportComment> {
        return await this.reportsCommentService.createReportForComment(userID, reportedAnswerID, body);
    }
}