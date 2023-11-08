import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateReportDto } from '../../dto/create-report.dto';
import { UpdateReportDto } from '../../dto/update-report.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { ReportUser } from '../../entities/report-user/report-user.entity';
import { ReportsUserService } from '../../service/user/reports-user.service';

@Controller('api')
export class ReportsUserController {
  constructor(private readonly reportsUserService: ReportsUserService) {}

  // route for get all reported user
  @Roles(Role.Admin)
  @Get('reports/users')
  async findAll(): Promise<ReportUser[]> {
    return await this.reportsUserService.findAllUserReported();
  }
  
  // route for report user
  @Post('reports/user/:reportedUserID/create')
  async createReportForUser(
    @CurrentUserID() userID: string,
    @Param('reportedUserID') reportedUserID: string,
    @Body() body: CreateReportDto
  ): Promise<ReportUser> {
    return await this.reportsUserService.createReporForUser(userID, reportedUserID, body);
  }
}
