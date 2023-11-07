import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from '../service/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { QuestionDTO } from '../dto/question.dto';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('api')
@Serialize(QuestionDTO)
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService
  ) {}

  // get all questions 
  @Roles(Role.Admin)
  @Get('questions/admin')
  async find(): Promise<Question[] | null> {
    return await this.questionsService.find()
  }

  // get all users question
  @Get('questions/user')
  async findAllQuestion(@CurrentUserID() userID: string): Promise<Question[] | null> {
    return await this.questionsService.findAllUserQuestion(userID)
  }
  
  // get all questions ( isActive: true )
  @Public()
  @Get('questions')
  async findAll(): Promise<Question[] | null> {
    return await this.questionsService.findAll();
  }

  // question details
  @Public()
  @Get('questions/:questionID')
  async findOne(@Param('questionID') questionID: string): Promise<Question | null> {
    return await this.questionsService.findOne(questionID);
  }

  // create questions
  @Post('questions/create')
  async create(
      @Body() createQuestionDto: CreateQuestionDto,
      @CurrentUserID() userID: string
    ): Promise<Question | null> {
    return await this.questionsService.create(createQuestionDto, userID);
  }

  // route for editing questions
  @Patch('questions/:questionID/:userID/update')
  async update(
    @CurrentUserID() userID: string,
    @Param('questionID') questionID: string, 
    @Body() body: UpdateQuestionDto
  ): Promise<Question | null> {
    return await this.questionsService.update(questionID, userID, body);
  }

  @Roles(Role.Admin)
  @Delete('questions/:questionID/delete')
  remove(@Param('questionID') questionID: string) {
    return this.questionsService.remove(questionID);
  }
}
