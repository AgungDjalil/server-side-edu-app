import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from '../service/answer.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { AnswerDTO } from '../dto/answer.dto';

@Controller('api')
@Serialize(AnswerDTO)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  // get all answer based on question
  @Get('questions/:questionID/answer')
  findAllAnswerBasedQuestion(@Param('questionID') questionID: string): Promise<Answer[] | null> {
    return this.answerService.findAllAnswerForQuestion(questionID)
  }
  
  // get all users answer
  @Get('users/:userID/answer')
  async findAllAnswer(@Param('userID') userID: string): Promise<Answer[] | null> {
    return await this.answerService.findAllUserAnswer(userID)
  }

  // for create new answer
  @Post('answer/:userID/create/:questionID')
  create(
    @Param('userID') userID: string,
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
