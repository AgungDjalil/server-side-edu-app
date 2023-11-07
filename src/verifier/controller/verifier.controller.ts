import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Answer } from 'src/answer/entities/answer.entity';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AnswerService } from 'src/answer/service/answer.service';

@Controller('api')
export class VerifierController {
  constructor(private readonly answerService: AnswerService) {}

  // verified some answers
  @Roles(Role.Moderator)
  @Post('verifier/:answerID/verify')
  async verifyAnswer(@Param('answerID') answerID: string): Promise<Answer | null> {
    return await this.answerService.verifyAnswer(answerID)
  }
  
  // get all unverified answer
  @Roles(Role.Moderator)
  @Get('verifier/answer')
  async findAll(): Promise<Answer[] | null> {
    return this.answerService.findAllAnswerUnverified();
  }
}
