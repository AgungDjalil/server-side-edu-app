import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CurrentUserID } from "src/decorators/currentUserID";
import { CreateReportDto } from "../../dto/create-report.dto";
import { ReportAnswer } from "../../entities/report-answer/report-answer.entity";
import { ReportsAnswerService } from "../../service/answer/reports-answer.service";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";

@Controller('api')
export class ReportsAnswerController {
    constructor(private readonly reportsAnswerService: ReportsAnswerService) { }

    // route for get all reprted answer
    @Roles(Role.Admin)
    @Get('reports/answer')
    async findAllReportedAnswer(): Promise<ReportAnswer[] | null> {
        return await this.reportsAnswerService.findAllReportedAnswer()
    }

    // route for report answer
    @Post('reports/answer/:reportedAnswerID/create')
    async createReportForAnswer(
        @CurrentUserID() userID: string,
        @Param('reportedAnswerID') reportedAnswerID: string,
        @Body() body: CreateReportDto
    ): Promise<ReportAnswer> {
        return await this.reportsAnswerService.createReportForAnswer(userID, reportedAnswerID, body);
    }
}