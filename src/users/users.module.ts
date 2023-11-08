import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReportUser } from 'src/reports/entities/report-user/report-user.entity';
import { ReportsUserService } from 'src/reports/service/user/reports-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ReportUser])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ReportsUserService
  ],
  exports: [UsersService]
})
export class UsersModule {}
