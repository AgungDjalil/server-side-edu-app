import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { User } from 'src/users/entities/user.entity';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // route for make user with role admin
  @Roles(Role.Admin)
  @Post('/auth/register/admin')
  async registerAdmin(@Body() body: CreateAuthDto): Promise<User> {
    return await this.authService.createAdmin(body)
  }

  // route for make user with role moderator
  @Roles(Role.Admin)
  @Post('/auth/register/moderator')
  async registerModerator(@Body() body: CreateAuthDto): Promise<User> {
    return await this.authService.createModerator(body)
  }

  // register for new user
  @Public()
  @Post('auth/register')
  async register(@Body() body: CreateAuthDto): Promise<User | null> {
    return await this.authService.create(body);
  }

  // login route for user
  @Public()
  @Post('auth/login')
  async signIn(@Body() body: LoginAuhDTO): Promise<object>{
    return await this.authService.login(body);
  }
}
