import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ReportsCommentService } from 'src/reports/service/comment/comment.service';
import { ReportComment } from 'src/reports/entities/report-comment/report-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment, 
      ReportComment
    ])
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ReportsCommentService
  ],
})
export class CommentsModule {}
