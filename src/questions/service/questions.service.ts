import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { ReportsQuestionService } from 'src/reports/service/question/reports-question.service';

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
      const questions = await this.questionRepository.find({
          where: {
            userID,
            isActive: true
          },
          relations: ['categoryID', 'tagID']
      })

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
      where: { isActive: true },
      relations: ['categoryID', 'tagID']
    })
    return question;
  }

  async findOne(questionID: string): Promise<Question | null> {
    try {
      const question = await this.questionRepository.findOne({
        where: { questionID },
        relations: ['categoryID', 'tagID', 'userID']
      })
      
      return question;

    } catch (err) {
      throw err
    }
  }

  async update(questionID: string, userID: string, body: UpdateQuestionDto): Promise<Question> {
    try {
      const question = await this.questionRepository.findOne({
        where: {
          questionID,
          userID
        }
      })

      question.questionText = body.questionText
      question.categoryID = body.category
      question.tagID = body.tag

      await this.questionRepository.save(question)
      
      return question

    } catch (err) { 
      return err.message
    }
  }

  async remove(questionID: string, reportID: string) {
    try {
      const question = await this.questionRepository.findOneBy({
        questionID
      })

      question.isActive = false

      const isSuccess = await this.reportsQuestionService.removeFromQuestionReportTable(reportID)

      if(isSuccess) {
        await this.questionRepository.save(question)
  
        return 'succes to delete question'; 
      }
      
    } catch (err) {
      return err.message
    }
  }
}
