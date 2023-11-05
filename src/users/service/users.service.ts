import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm'
import { User } from '../../users/entities/user.entity'

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(userID: string) {
    return ;
  }
}
 