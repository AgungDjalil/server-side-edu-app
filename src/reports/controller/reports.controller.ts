import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { Public } from 'src/decorators/public.decorator';
import { ReportQuestion } from '../entities/report-question.entity';
import { ReportAnswer } from '../entities/report-answer.entity';
import { ReportUser } from '../entities/report-user.entity';

@Controller('api')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // route for get all reported user
  @Roles(Role.Admin)
  @Public()
  @Get('reports')
  async findAll(@Query() query: string) {
    // return await this.reportsService.findAllUserReported();
  }

  // route for report answer
  @Post('reports/:reportedAnswerID/create')
  async createReportForAnswer(
    @CurrentUserID() userID: string,
    @Param('reportedAnswerID') reportedAnswerID: string,
    @Body() body: CreateReportDto
  ): Promise<ReportAnswer> {
    return await this.reportsService.createReportForAnswer(userID, reportedAnswerID, body);
  }

  // route for report question
  @Post('reports/:reportedQuestionID/create')
  async createReportForQuestion(
    @CurrentUserID() userID: string,
    @Param('reportedQuestionID') reportedQuestionID: string,
    @Body() body: CreateReportDto
  ): Promise<ReportQuestion> {
    return await this.reportsService.createReportForQuestion(userID, reportedQuestionID, body);
  }

  // route for report user
  @Post('reports/:reportedUserID/create')
  async createReportForUser(
    @CurrentUserID() userID: string,
    @Param('reportedUserID') reportedUserID: string,
    @Body() body: CreateReportDto
  ): Promise<ReportUser> {
    return await this.reportsService.createReporForUser(userID, reportedUserID, body);
  }
}
