import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>
  ) {}

  async create(body: CreateQuestionDto, userID: string): Promise<Question | null> {
    try {
      const question = this.questionRepository.create({
        questionText: body.questionText,
        userID
      })

      await this.questionRepository.save(question)

      return question

    } catch (err) {
      console.log(err)
    }
  }

  async findAll(): Promise<Question[] | null> {
    const question = await this.questionRepository.find()
    return question;
  }

  async findOne(questionID: string): Promise<Question | null> {
    try {
      const question = await this.questionRepository.findOneBy({
        questionID
      })

      return question;

    } catch (err) {
      console.log(err.message)
    }
  }

  async update(questionID: string, userID: string, body: UpdateQuestionDto): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneBy({
        questionID,
        userID
      })

      Object.assign(question, body)

      await this.questionRepository.save(question)
      
      return question

    } catch (err) { 
      console.log(err.message)
    }
  }

  // async remove(questionID: string) {
  //   try {
  //     const question = await this.questionRepository.findOneBy({
  //       questionID
  //     })

  //     Object.assign(question, )

  //     await this.questionRepository.save(question)
      
  //     return question

  //     return `This action removes a #${} question`;
  //   } catch (err) {

  //   }
  // }
}
