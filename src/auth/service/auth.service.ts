import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginAuthDTO } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async createModerator(body: CreateUserDTO) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)
  
      const moderator = this.userRepository.create({
        username: body.username,
        email: body.email,
        password: hashPassword,
        role: Role.Moderator
      })

      await this.userRepository.save(moderator)

      return moderator

    } catch (err) {
      return err.message
    }
  }

  async createAdmin(body: CreateUserDTO) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)
  
      const admin = this.userRepository.create({
        username: body.username,
        email: body.email,
        password: hashPassword,
        role: Role.Admin
      })

      await this.userRepository.save(admin)

      return admin

    } catch (err) {
      return err.message
    }
  }

  async create(body: CreateUserDTO) {
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

  async login(body: LoginAuthDTO) {
    try {
      if (body.username) {
        const user = await this.userRepository.findOneBy({ username: body.username })

        if(user && !user.isActive)
          throw new ForbiddenException(`you've been suspended for ${user.suspensionEndDate}`)

        if(user && !user.isActive)
          throw new ForbiddenException(`you have been blocked forever`)

        const passwordMatch = await bcrypt.compare(body.password, user.password)

        if (!passwordMatch)
          throw new NotAcceptableException('password mismatch');

        const payload = {
          sub: user.userID,
          username: user.username,
          role: user.role,
          suspenDate: user.suspensionEndDate
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
          role: user.role,
          suspenDate: user.suspensionEndDate
        }

        return {
          access_token: await this.jwtService.signAsync(payload)
        }
      }
    } catch (err) {
      return err.message
    }
  }
}
