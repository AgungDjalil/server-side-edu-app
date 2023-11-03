import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity'
import { Question } from 'src/questions/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get('users')
  async findAll(): Promise<User[] | null> {
    return await this.usersService.findAll();
  }

  // get one user with id
  @Get('users/:userID')
  async findOne(@Param('userID') userID: string): Promise<User | null> {
    return await this.usersService.findOne(userID);
  }

  // get all users question
  @Get('users/:userID/questions')
  async findAllQuestion(@Param('userID') userID: string): Promise<Question[] | null> {
    return await this.usersService.findAllUserQuestion(userID)
  }

  // get all users answer
  @Get('users/:userID/answer')
  async findAllAnswer(@Param('userID') userID: string): Promise<Answer[] | null> {
    return await this.usersService.findAllUserAnswer(userID)
  }

  // route for edit user
  @Patch('users/:userID/update')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }

  // route for delete user
  @Delete('users/:userID/delete')
  remove(@Param('userID') userID: string) {
    return this.usersService.remove(userID);
  }
}
