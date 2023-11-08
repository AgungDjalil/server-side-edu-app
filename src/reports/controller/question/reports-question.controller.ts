import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CurrentUserID } from "src/decorators/currentUserID";
import { CreateReportDto } from "../../dto/create-report.dto";
import { ReportQuestion } from "../../entities/report-question/report-question.entity";
import { ReportsQuestionService } from "../../service/question/reports-question.service";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";

@Controller('api')
export class ReportsQuestionController {
    constructor(private readonly reportsQuestionService: ReportsQuestionService) {}

    // route for get all reported questions
    @Roles(Role.Admin)
    @Get('reports/questions')
    async findAllReportedQuestions(): Promise<ReportQuestion[] | null> {
        return await this.reportsQuestionService.findAllReportQuestions()
    }

    // route for report question
    @Post('reports/:reportedQuestionID/create')
    async createReportForQuestion(
        @CurrentUserID() userID: string,
        @Param('reportedQuestionID') reportedQuestionID: string,
        @Body() body: CreateReportDto
    ): Promise<ReportQuestion> {
        return await this.reportsQuestionService.createReportForQuestion(userID, reportedQuestionID, body);
    }
}