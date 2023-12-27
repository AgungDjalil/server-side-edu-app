import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from '../service/answer.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { AnswerDTO } from '../dto/answer.dto';
import { Public } from 'src/decorators/public.decorator';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('api')
// @Serialize(AnswerDTO)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  // route for get all answer (banned and no)
  @Roles(Role.Admin)
  @Get('answers')
  async findAllAnswer(): Promise<Answer[] | null> {
    return await this.answerService.find()
  }

  // get all answer based on question
  @Public()
  @Get('questions/:questionID/answer')
  async findAllAnswerBasedQuestion(@Param('questionID') questionID: string): Promise<Answer[] | null> {
    return await this.answerService.findAllAnswerForQuestion(questionID)
  }
  
  // get all users answer
  @Get('answer/:userID')
  async findAllUserAnswer(@Param('userID') userID: string): Promise<Answer[] | null> {
    return await this.answerService.findAllUserAnswer(userID)
  }

  // for create new answer
  @Post('answer/user/create/:questionID')
  create(
    @CurrentUserID() userID: string,
    @Param('questionID') questionID: string,
    @Body() body: CreateAnswerDto
  ): Promise<Answer | null> {
    return this.answerService.create(body, userID, questionID);
  }

  // edit answer
  @Patch('answer/:answerID/edit')
  update(
    @Param('answerID') answerID: string, 
    @Body() body: UpdateAnswerDto): Promise<Answer> {
    return this.answerService.update(answerID, body);
  }

  // delete answer
  @Roles(Role.Admin)
  @Delete('answer/:answerID/delete/:reportID')
  async remove(
    @Param('answerID') answerID: string,
    @Param('reportID') reportID: string
  ): Promise<string> {
    return this.answerService.remove(answerID, reportID);
  }
}
