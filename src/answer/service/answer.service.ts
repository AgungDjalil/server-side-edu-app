import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';
import { Repository } from 'typeorm';
import { ReportsAnswerService } from 'src/reports/service/answer/reports-answer.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private readonly reportAnswerService: ReportsAnswerService
  ) {}

  async findOneByID(answerID: string) {
    try {
      const answer = await this.answerRepository.findOneBy({answerID})
      return answer
    } catch (err) {
      throw err
    }
  }

  async find(): Promise<Answer[] | null> {
    try {
      const answer = await this.answerRepository.find()
  
      return answer

    } catch (err) {
      return err.message
    }
  }

  async verifyAnswer(answerID: string): Promise<Answer | null> {
    try {
      const answer = await this.answerRepository.findOneById(answerID)

      answer.isVerified = true;

      await this.answerRepository.save(answer)
      
      return answer

    } catch (err) {
      return err.message
    }
  }

  async findAllAnswerUnverified(): Promise<Answer[] | null> {
    try {
      const answer = await this.answerRepository.find({
        where: { isVerified: false },
        relations: ['questionID']
      })
  
      return answer

    } catch (err) {
      return err
    }
  }

  async findAllUserAnswer(userID: string): Promise<Answer[] | null> {
    try {
      const answers = await this.answerRepository.find({ 
        where: { 
          isActive: true,
          userID
        } 
      })
  
      return answers

    } catch (err) {
      return err.message
    }
  }

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
      return err.message
    }
  }

  async findAllAnswerForQuestion(questionID: string): Promise<Answer[] | null> {
    try {
      const answer = this.answerRepository.find({ 
        where: { 
          questionID,
          isActive: true
        },
        relations: ['userID']
      })

      return answer

    } catch (err) {
      return err.message
    }
  }

  async update(answerID: string, body: UpdateAnswerDto): Promise<Answer> {
    try {
      const answer = await this.answerRepository.findOneBy({ answerID })

      answer.answerText = body.answerText

      await this.answerRepository.save(answer)

      return answer;

    } catch (err) {
      return err.message
    }

  }

  async remove(answerID: string, reportID: string): Promise<string> {
    try {
      const answer = await this.answerRepository.findOneById(answerID)

      answer.isActive = false

      const isSuccess = await this.reportAnswerService.removeFromAnswerReportTable(reportID)

      if(isSuccess) {

        await this.answerRepository.save(answer)

        return 'answer has been hide';
      }

    } catch (err) {
      return 'err.message'
    }
  }
}
