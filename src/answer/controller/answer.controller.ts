import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from '../service/answer.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';

@Controller('api')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

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
