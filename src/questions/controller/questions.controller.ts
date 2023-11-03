import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from '../service/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/service/answer.service';

@Controller('api')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly answerService: AnswerService
  ) {}
  
  // get all questions
  @Get('questions')
  async findAll(): Promise<Question[] | null> {
    return await this.questionsService.findAll();
  }

  // question details
  @Get('questions/:questionID')
  async findOne(@Param('questionID') questionID: string): Promise<Question | null> {
    return await this.questionsService.findOne(questionID);
  }

  // get all answer for question
  @Get('questions/:questionID/answer')
  findAllAnswer(@Param('questionID') questionID: string): Promise<Answer[] | null> {
    return this.answerService.findAllAnswerForQuestion(questionID)
  }

  // create questions
  @Post('questions/:userID/create')
  async create(
      @Body() createQuestionDto: CreateQuestionDto,
      @Param('userID') userID: string
    ): Promise<Question | null> {
    return await this.questionsService.create(createQuestionDto, userID);
  }

  // route for editing questions
  @Patch('questions/:questionID/:userID/update')
  async update(
    @Param('userID') userID: string,
    @Param('questionID') questionID: string, 
    @Body() body: UpdateQuestionDto
  ): Promise<Question | null> {
    return await this.questionsService.update(questionID, userID, body);
  }
s
  // @Delete('questions/:questionID/delete')
  // remove(@Param('questionID') questionID: string) {
  //   return this.questionsService.remove(questionID);
  // }
}
