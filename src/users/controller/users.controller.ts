import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity'

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get('users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // get one user with id
  @Get('users/:userID')
  findOne(@Param('userID') userID: string) {
    return this.usersService.findOne(userID);
  }

  // route for edit user
  @Patch('users/:userID/update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // route for delete user
  @Delete('users/:userID/delete')
  remove(@Param('userID') userID: string) {
    return this.usersService.remove(userID);
  }
}
