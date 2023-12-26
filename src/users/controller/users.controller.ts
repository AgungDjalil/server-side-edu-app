import { Controller, Get, Headers, Body, Patch, Param, Delete, Post, HttpCode, HttpStatus, Query, UseInterceptors, ClassSerializerInterceptor, UsePipes } from '@nestjs/common';
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
import { PageDto } from '../dto/page.dto';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PaginationPipe } from 'src/pipes/pagination.pipe';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users ( banned, suspended, etc)
  @Serialize(UserDTO)
  @Roles(Role.Admin)
  @Get('users/admin/all')
  async findAllUsers(@Query() query: string): Promise<User[] | null> {
    return await this.usersService.find(query)
  }

  // get all users ( isActive: true, isSuspend: false)
  // this route use pagination
  @Public()
  @Get('users')
  async findAll(@Query() pageOptionsDto :PageOptionsDto) {
    return await this.usersService.findAll(pageOptionsDto);
  }

  // get one user with id
  @Public()
  @Serialize(UserDTO)
  @Get('users/:userID')
  async findOne(@Param('userID') userID: string): Promise<User | null> {
    return await this.usersService.findOne(userID);
  }

  // route for edit user
  @Patch('users/update')
  @Serialize(UserDTO)
  async update(@CurrentUserID() userID: string, @Body() body: UpdateUserDto){
    return await this.usersService.update(userID, body);
  }

  // route for suspend users
  @Roles(Role.Admin)
  @Serialize(UserDTO)
  @Post('users/:userID/suspend/:reportID') 
  async suspend(
    @Param('userID') userID: string, 
    @Param('reportID') reportID: string, 
    @Body() body: any
  ) {
    return await this.usersService.suspend(userID, reportID, body)
  }

  // route for delete user
  @Roles(Role.Admin)
  @Serialize(UserDTO)
  @Delete('users/:userID/delete')
  async remove(@Param('userID') userID: string): Promise<boolean | string> {
    return await this.usersService.remove(userID);
  }
}
