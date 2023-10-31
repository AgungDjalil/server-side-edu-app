import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // register for new user
  @Post('auth/register')
  register(@Body() body: CreateAuthDto) {
    return this.authService.create(body.username, body.email, body.password, body.role);
  }

  // login route for user
  @Post('auth/login')
  signIn(@Body() body: LoginAuhDTO) {
    return this.authService.login(body.username, body.email, body.password);
  }
}
