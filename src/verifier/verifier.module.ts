import { Module } from '@nestjs/common';
import { VerifierController } from './controller/verifier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/service/answer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer])
  ],
  controllers: [VerifierController],
  providers: [
    AnswerService
  ],
})
export class VerifierModule {}
