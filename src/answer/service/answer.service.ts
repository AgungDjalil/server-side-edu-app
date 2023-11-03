import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';
import { Repository } from 'typeorm';
import { QuestionsService } from 'src/questions/service/questions.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>
  ) {}

  async create(body: CreateAnswerDto, userID: string, questionID: string): Promise<Answer | null> {
    try {
      const answer = this.answerRepository.create({
        userID,
        questionID,
        answerText: body.answerText
      })

      await this.answerRepository.save(answer)
      
      return answer;

    } catch (err) {
      console.log(err)
    }
  }

  async findAllAnswerForQuestion(questionID: string): Promise<Answer[] | null> {
    try {
      const answer = this.answerRepository.findBy({ questionID })

      return answer

    } catch (err) {
      console.log(err)
    }
  }

  async update(answerID: string, body: UpdateAnswerDto): Promise<Answer> {
    try {
      const answer = await this.answerRepository.findOneBy({ answerID })

      Object.assign(answer, body)

      await this.answerRepository.save(answer)

      return answer;

    } catch (err) {
      console.log(err)
    }

  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
