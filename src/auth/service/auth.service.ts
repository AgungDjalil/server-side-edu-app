import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async createModerator(body: CreateAuthDto) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)
  
      const moderator = this.userRepository.create({
        username: body.username,
        email: body.email,
        password: hashPassword,
        role: Role.Moderator
      })

      return moderator

    } catch (err) {
      console.log(err)
    }
  }

  async createAdmin(body: CreateAuthDto) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)
  
      const admin = this.userRepository.create({
        username: body.username,
        email: body.email,
        password: hashPassword,
        role: Role.Admin
      })

      return admin

    } catch (err) {
      console.log(err)
    }
  }

  async create(body: CreateAuthDto) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)

      const user = this.userRepository.create({
        username: body.username,
        email: body.email,
        password: hashPassword
      })

      await this.userRepository.save(user)

      return user

    } catch (err) {

      if (err.message.includes('@gmail.com'))
        throw new UnprocessableEntityException('Email already exists')

      throw new UnprocessableEntityException('Username already exists')
    }
  }

  async login(body: LoginAuhDTO) {
    try {
      if (body.username) {
        const user = await this.userRepository.findOneBy({ username: body.username })

        const passwordMatch = await bcrypt.compare(body.password, user.password)

        if (!passwordMatch)
          throw new NotAcceptableException('password mismatch');

        const payload = {
          sub: user.userID,
          username: user.username,
          role: user.role
        }

        return {
          access_token: await this.jwtService.signAsync(payload)
        }

      } else if (body.email) {
        const user = await this.userRepository.findOneBy({ email: body.email })

        const passwordMatch = await bcrypt.compare(body.password, user.password)

        if (!passwordMatch)
          throw new NotAcceptableException('password mismatch');

        const payload = {
          sub: user.userID,
          username: user.username,
          role: user.role
        }

        return {
          access_token: await this.jwtService.signAsync(payload)
        }
      }
    } catch (err) {
      console.error(err.message)
    }
  }
}
