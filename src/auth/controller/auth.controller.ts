import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginAuthDTO } from '../dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { User } from 'src/users/entities/user.entity';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // // logout user
  // @Post('/auth/logout')
  // async logoutUser(@Headers('authorization') token: string): Promise<void> {
  //   const [Bearer, JwtToken] = token.split(' ');
  //   console.log(token)
  // }

  // route for make user with role admin
  @Roles(Role.Admin)
  @Post('/auth/register/admin')
  async registerAdmin(@Body() body: CreateUserDTO): Promise<User> {
    return await this.authService.createAdmin(body)
  }

  // route for make user with role moderator
  @Roles(Role.Admin)
  @Post('/auth/register/moderator')
  async registerModerator(@Body() body: CreateUserDTO): Promise<User> {
    return await this.authService.createModerator(body)
  }

  // register for new user
  @Public()
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
