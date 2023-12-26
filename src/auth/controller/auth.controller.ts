import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginAuthDTO } from '../dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { User } from 'src/users/entities/user.entity';
import Serialize from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/users/dto/user.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // route for make user with role admin
  @Roles(Role.Admin)
  @Serialize(UserDTO)
  @Post('/auth/register/admin')
  async registerAdmin(@Body() body: CreateUserDTO): Promise<User> {
    return await this.authService.createAdmin(body)
  }

  // route for make user with role moderator
  @Serialize(UserDTO)
  @Roles(Role.Admin)
  @Post('/auth/register/moderator')
  async registerModerator(@Body() body: CreateUserDTO): Promise<User> {
    return await this.authService.createModerator(body)
  }

  // register for new user
  @Public()
  @Serialize(UserDTO)
  @Post('auth/register')
  async register(@Body() body: CreateUserDTO): Promise<User | null> {
    return await this.authService.create(body);
  }

  // login route for user
  @Public()
  @Post('auth/login')
  async signIn(@Body() body: LoginAuthDTO): Promise<object>{
    return await this.authService.login(body);
  }
}
