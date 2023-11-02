import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from '../service/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';

@Controller('api')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // create questions
  @Post('questions/:userID/create')
  create(
      @Body() createQuestionDto: CreateQuestionDto,
      @Param('userID') userID: string
    ): Promise<Question> {
    return this.questionsService.create(createQuestionDto, userID);
  }

  // get all questions
  @Get('questions')
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  // question details
  @Get('questions/:questionID')
  findOne(@Param('questionID') questionID: string): Promise<Question> {
    return this.questionsService.findOne(questionID);
  }

  @Patch('questions/:questionID/:userID/update')
  update(
    @Param('userID') userID: string,
    @Param('questionID') questionID: string, 
    @Body() body: UpdateQuestionDto
  ): Promise<Question> {
    return this.questionsService.update(questionID, userID, body);
  }

  // @Delete('questions/:questionID/delete')
  // remove(@Param('questionID') questionID: string) {
  //   return this.questionsService.remove(questionID);
  // }
}
