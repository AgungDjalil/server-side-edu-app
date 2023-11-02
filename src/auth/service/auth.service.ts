import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(body: CreateAuthDto) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)

      const user = this.userRepository.create({ 
        username: body.username, 
        email: body.email, 
        password:hashPassword, 
        role: body.role 
      })

      await this.userRepository.save(user)

      return user

    } catch (err) {

      if(err.message.includes('@gmail.com'))
        throw new UnprocessableEntityException('Email already exists')

      throw new UnprocessableEntityException('Username already exists')
    }
  }

  async login(body: LoginAuhDTO) {
    const user = body.username ? 
      await this.userRepository.findOneBy({ username: body.username }): 
      await this.userRepository.findOneBy({ email: body.email })

    if(!user)
      throw new NotFoundException(`User ${body.username} not found`);

    const passwordMatch = await bcrypt.compare(body.password, user.password)

    if(!passwordMatch)
      throw new NotAcceptableException('password mismatch');

    return user
  }
}
