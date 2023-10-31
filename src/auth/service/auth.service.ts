import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(username: string, email: string, password: string, role: string) {
    const isEmail = await this.userRepository.findOneBy({ email })

    if(isEmail)
        throw new NotAcceptableException('Invalid email address')

    const isUsername = await this.userRepository.findOneBy({ username })

    if(isUsername)
        throw new NotAcceptableException('Invalid username')

    const user = this.userRepository.create({ username, email, password })
    
    await this.userRepository.save(user)

    return user
  }

  async login(username: string, email: string , password: string) {
    const user = username ? await this.userRepository.findOneBy({ username }) : await this.userRepository.findOneBy({ email })

    if(!user) 
        throw new NotFoundException('Email or username not found')

    const isSuccess = await bcrypt.compare(password, user.password)

    if(!isSuccess) 
        throw new UnauthorizedException('Password is incorrect')

    return user
  }
}
