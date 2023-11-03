import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Question } from 'src/questions/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<User[] | null> {
    const users = await this.userRepository.find()

    if(!users)
      throw new NotFoundException("can't find any users");

    return users;
  }

  async findOne(userID: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneById(userID)
  
      if(!user)
        throw new NotFoundException("user not found");
        
      return user;

    } catch (err) {
      console.log(err.message)
    }
  }

  async findAllUserQuestion(userID: string): Promise<Question[] | null> {
    try {
      const { questions } = await this.userRepository.findOne({
        where: {
          userID
        },
        relations: {
          questions: true
        }
      })
  
      return questions

    } catch (err) {
      console.log(err.message)
    }
  }

  async findAllUserAnswer(userID: string): Promise<Answer[] | null> {
    try {
      const { answers } = await this.userRepository.findOne({
        where: { userID },
        relations: { answers: true}
      })
  
      return answers

    } catch (err) {
      console.log(err.message)
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(userID: string) {
    return ;
  }
}
 