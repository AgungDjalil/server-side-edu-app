import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { CommentDTO } from '../dto/comment.dto';

@Controller('api')
@Serialize(CommentDTO)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // get all questions comment
  @Get('comments/question/:questionID')
  async findAllAnwerForQuestion(@Param('questionID') questionID: string): Promise<Comment[] | null>{
    return await this.commentsService.findAllCommentFor(questionID, null);
  }

  // get all answer comments
  @Get('comments/answer/:answerID')
  async findAllQuestionForAnswer(@Param('answerID') answerID: string): Promise<Comment[] | null> {
    return await this.commentsService.findAllCommentFor(null, answerID)
  }

  // create comment for question
  @Post('comments/:userID/create/:questionID/question')
  async createCommentForQuestion(
    @Param('userID') userID: string,
    @Param('questionID') questionID: string,
    @Body() body: CreateCommentDto): Promise<Comment | null> {
    return this.commentsService.createCommentFor(userID, null, questionID, body);
  }

  // create comment for answer
  @Post('comments/:userID/create/:answerID/answer')
  async createCommentForAnswer(
    @Param('userID') userID: string,
    @Param('answerID') answerID: string,
    @Body() body: CreateCommentDto): Promise<Comment | null> {
    return this.commentsService.createCommentFor(userID, answerID, null, body);
  }

  // delete comment
  @Delete('comments/:commentID/delete')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
