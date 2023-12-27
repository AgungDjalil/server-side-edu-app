import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { CommentDTO } from '../dto/comment.dto';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('api')
// @Serialize(CommentDTO)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // get all questions comment
  @Public()
  @Get('comments/question/:questionID')
  async findAllAnwerForQuestion(@Param('questionID') questionID: string): Promise<Comment[] | null>{
    return await this.commentsService.findAllCommentFor(questionID, null);
  }

  // get all answer comments
  @Public()
  @Get('comments/answer/:answerID')
  async findAllQuestionForAnswer(@Param('answerID') answerID: string): Promise<Comment[] | null> {
    return await this.commentsService.findAllCommentFor(null, answerID)
  }

  // create comment for question
  @Post('comments/user/create/:questionID/question')
  async createCommentForQuestion(
    @CurrentUserID() userID: string,
    @Param('questionID') questionID: string,
    @Body() body: CreateCommentDto): Promise<Comment | null> {
    return this.commentsService.createCommentFor(userID, null, questionID, body);
  }

  // create comment for answer
  @Post('comments/user/create/:answerID/answer')
  async createCommentForAnswer(
    @CurrentUserID() userID: string,
    @Param('answerID') answerID: string,
    @Body() body: CreateCommentDto): Promise<Comment | null> {
    return this.commentsService.createCommentFor(userID, answerID, null, body);
  }

  // delete comment
  @Roles(Role.Admin)
  @Delete('comments/:commentID/delete/:reportID')
  remove(
    @Param('commentID') commentID: string,
    @Param('reportID') reportID: string
  ) {
    return this.commentsService.remove(commentID, reportID);
  }
}
