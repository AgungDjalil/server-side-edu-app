import { Controller, Get, Headers, Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity'
import Serialize from 'src/interceptors/serialize.interceptor';
import { UserDTO } from '../dto/user.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { CurrentUserID } from 'src/decorators/currentUserID';
import { SuspendUserDTO } from '../dto/suspend-user.dto';

@Controller('api')
@Serialize(UserDTO)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users ( banned, suspended, etc)
  @Roles(Role.Admin)
  @Get('users/admin/all')
  async findAllUsers(): Promise<User[] | null> {
    return await this.usersService.find()
  }

  // get all users ( isActive: true, isSuspend: false)
  @Public()
  @Get('users')
  async findAll(): Promise<User[] | null> {
    return await this.usersService.findAll();
  }

  // get one user with id
  @Public()
  @Get('users/:userID')
  async findOne(@Param('userID') userID: string): Promise<User | null> {
    return await this.usersService.findOne(userID);
  }

  // route for edit user
  @Patch('users/update')
  async update(@CurrentUserID() userID: string, @Body() body: UpdateUserDto){
    return await this.usersService.update(userID, body);
  }

  // route for suspend users
  @Roles(Role.Admin)
  @Post('users/:userID/suspend') 
  async suspend(@Param('userID') userID: string, @Body() body: SuspendUserDTO) {
    return await this.usersService.suspend(userID, body)
  }

  // route for delete user
  @Roles(Role.Admin)
  @Delete('users/:userID/delete')
  async remove(@Param('userID') userID: string): Promise<boolean | string> {
    return await this.usersService.remove(userID);
  }
}
