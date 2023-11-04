import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';

@Controller('api')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // get all questions comment
  @Get('comments/question/:questionID')
  async findAllAnwerForQuestion(@Param('questionID') questionID: string): Promise<Comment[] | null>{
    return await this.commentsService.findAllCommentFor(questionID);
  }

  @Get('comments/answer/:answerID')
  async findAllQuestionForAnswer(@Param('answerID') answerID: string): Promise<Comment[] | null> {
    return await this.commentsService.findAllCommentFor(answerID)
  }

  // create comment for question
  @Post('comments/:userID/create/:questionID')
  async createCommentForQuestion(
    @Param('userID') userID: string,
    @Param('questionID') questionID: string,
    @Body() body: CreateCommentDto): Promise<Comment | null> {
    return this.commentsService.createQuestionComment(userID, questionID, body);
  }

  // create comment for question
  @Post('comments/:userID/create/:answerID')
  async createCommentForAnswer(
    @Param('userID') userID: string,
    @Param('answerID') answerID: string,
    @Body() body: CreateCommentDto): Promise<Comment | null> {
    return this.commentsService.createAnswerComment(userID, answerID, body);
  }

  // delete comment
  @Delete('comments/:commentID/delete')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
