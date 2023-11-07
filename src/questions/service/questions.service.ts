import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { ReportsQuestionService } from 'src/reports/service/reports-question.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    private readonly reportsQuestionService: ReportsQuestionService
  ) {}

  async find(): Promise<Question[] | null> {
    try {
      const questions = await this.questionRepository.find()

      return questions

    } catch (err) {
      return err.message
    }
  }

  async findAllUserQuestion(userID: string): Promise<Question[] | null> {
    try {
      const questions = await this.questionRepository.findBy({ userID })
  
      return questions

    } catch (err) {
      return err.message
    }
  }

  async create(body: CreateQuestionDto, userID: string): Promise<Question | null> {
    try {
      if(!body.categoryID) {
        const question = this.questionRepository.create({
          questionText: body.questionText,
          userID,
          categoryID: body.categoryID
        })
  
        await this.questionRepository.save(question)
  
        return question

      } else if (body.categoryID) {
        const question = this.questionRepository.create({
          questionText: body.questionText,
          userID,
          categoryID: body.categoryID,
          tagID: body.tagID
        })
  
        await this.questionRepository.save(question)
  
        return question        
      }

    } catch (err) {
      return err.message
    }
  }

  async findAll(): Promise<Question[] | null> {
    const question = await this.questionRepository.find({
      where: { isActive: true }
    })
    return question;
  }

  async findOne(questionID: string): Promise<Question | null> {
    try {
      const question = await this.questionRepository.findOneBy({
        questionID
      })

      return question;

    } catch (err) {
      return err.message
    }
  }

  async update(questionID: string, userID: string, body: UpdateQuestionDto): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneBy({
        questionID,
        userID
      })

      question.questionText = body.questionText

      await this.questionRepository.save(question)
      
      return question

    } catch (err) { 
      return err.message
    }
  }

  async remove(questionID: string) {
    try {
      const question = await this.questionRepository.findOneBy({
        questionID
      })

      question.isActive = false

      const isSuccess = await this.reportsQuestionService.removeFromQuestionReportTable(questionID)

      if(isSuccess) {
        await this.questionRepository.save(question)
  
        return 'succes to delete user'; 
      }
      
    } catch (err) {
      return err.message
    }
  }
}
