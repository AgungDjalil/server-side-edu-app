import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity'
import Serialize from 'src/interceptor/serialize.interceptor';
import { UserDTO } from '../dto/user.dto';

@Controller('api')
@Serialize(UserDTO)
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
