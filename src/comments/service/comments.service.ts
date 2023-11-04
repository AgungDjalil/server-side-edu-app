import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}

  async findAllCommentFor(questionID: string = null, answerID: string = null): Promise<Comment[] | null> {
    if(questionID) {
      const comments = await this.commentRepository.findBy({ questionID })

      return comments

    } else if (answerID) {
      const comments = await this.commentRepository.findBy({ answerID })

      return comments
    }
  }

  async createAnswerComment(
    userID: string,
    answerID: string,
    body: CreateCommentDto
  ): Promise<Comment | null> {
    try {
      const comment = this.commentRepository.create({ 
        userID,
        answerID,
        commentText: body.commentText 
      })

      await this.commentRepository.save(comment)  
  
      return comment;

    } catch (err) {
      console.log(err.message)
    }
  }

  async createQuestionComment(
    userID: string,
    questionID: string,
    body: CreateCommentDto
  ): Promise<Comment | null> {
    try {
      const comment = this.commentRepository.create({ 
        userID,
        questionID,
        commentText: body.commentText 
      })

      await this.commentRepository.save(comment)  
  
      return comment;

    } catch (err) {
      console.log(err.message)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
