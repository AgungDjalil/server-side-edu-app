import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from '../service/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';
import Serialize from 'src/interceptor/serialize.interceptor';
import { QuestionDTO } from '../dto/question.dto';

@Controller('api')
@Serialize(QuestionDTO)
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService
  ) {}

  // get all users question
  @Get('question/:userID/user')
  async findAllQuestion(@Param('userID') userID: string): Promise<Question[] | null> {
    return await this.questionsService.findAllUserQuestion(userID)
  }
  
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

  // @Delete('questions/:questionID/delete')
  // remove(@Param('questionID') questionID: string) {
  //   return this.questionsService.remove(questionID);
  // }
}
