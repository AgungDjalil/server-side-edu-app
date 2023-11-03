import { Module } from '@nestjs/common';
import { AnswerService } from './service/answer.service';
import { AnswerController } from './controller/answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer])
  ],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
