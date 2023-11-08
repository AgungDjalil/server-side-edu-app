import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsCommentService } from 'src/reports/service/comment/comment.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly reportCommentService: ReportsCommentService
  ) {}

  async findAllCommentFor(questionID: string, answerID: string): Promise<Comment[] | null> {
    if(questionID) {
      const comments = await this.commentRepository.find({ 
        where: {
          questionID,
          isActive: true
        } 
      })

      return comments

    } else if (answerID) {
      const comments = await this.commentRepository.find({ 
        where: {
          answerID,
          isActive: true
        } 
      })
      
      return comments
    }
  }

  async createCommentFor(
    userID: string,
    answerID: string,
    questionID: string,
    body: CreateCommentDto
  ): Promise<Comment | null> {
    try {

      if(answerID) {
        const comment = this.commentRepository.create({ 
          userID,
          answerID,
          commentText: body.commentText 
        })
  
        await this.commentRepository.save(comment)  
    
        return comment;

      } else if (questionID) {
        const comment = this.commentRepository.create({ 
          userID,
          questionID,
          commentText: body.commentText 
        })
        console.log(comment)
        await this.commentRepository.save(comment)  
    
        return comment;
      }
    } catch (err) {
      return err.message
    }
  }

  async remove(commentID: string, reportID: string): Promise<string> {
    try {
      const comment = await this.commentRepository.findOneById(commentID)
  
      comment.isActive = false

      const isSuccess = this.reportCommentService.removeFromCommentReportTable(reportID)

      if(isSuccess) {

        await this.commentRepository.save(comment)

        return 'comment has been hide';
      }

    } catch (err) {
      return err.message
    }
  }
}
