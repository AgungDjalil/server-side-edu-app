import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { SuspendUserDTO } from '../dto/suspend-user.dto';
import { ReportsUserService } from 'src/reports/service/user/reports-user.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, 
    private reportsUserService: ReportsUserService
  ) {}

  async find(): Promise<User[] | null> {
    try {
      const users = await this.userRepository.find()

      return users
      
    } catch (err) {
      return err.message
    }
  }

  async suspend(userID: string, reportID: string, body: any) {
    try {
      const user = await this.userRepository.findOneById(userID)
      
      user.suspensionEndDate = body.suspensionEndDate

      user.isSuspend = true
      
      const isSucces = await this.reportsUserService.removeFromUserReportTable(reportID)
      
      if(isSucces) {
        await this.userRepository.save(user)
        
        return 'succes to suspend user'
      }

      return false

    } catch (err) {
      console.log(err)
      return err.message
    }
  }

  async isUserSuspended(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOneById(userId);

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const day = currentDate.getDate()

    const userDateSuspendsion = user.suspensionEndDate.toDateString()

    if (
        user && user.isSuspend 
        && user.suspensionEndDate 
        &&  userDateSuspendsion !== `${year}-${month}-${day}`
      )
      return true;
    
    return false;
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.userRepository.find({
      where: { 
        isActive: true,
        isSuspend: false
      }
    })

    if(!users)
      throw new NotFoundException("can't find any users");

    return users;
  }

  async findOne(userID: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneById(userID)
  
      if(!user)
        throw new NotFoundException("user not found");
        
      return user;

    } catch (err) {
      return err.message
    }
  }

  async update(userID: string, body: UpdateUserDto): Promise<User |null | string> {
    try {
      const user = await this.userRepository.findOneById(userID);

      user.username = body.username;

      await this.userRepository.save(user)

      return user;

    } catch (err) {
      return err.message
    }
  }

  async remove(userID: string): Promise<boolean | string> {
    try {
      const user = await this.userRepository.findOneById(userID)
      
      user.isActive = false

      await this.userRepository.save(user)

      return true;

    } catch (err) {
      return err.message
    }
  }
}
 