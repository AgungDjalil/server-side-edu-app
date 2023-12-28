import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateUserDto } from '../dto/update-user.dto';
import { ILike, Repository } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { SuspendUserDTO } from '../dto/suspend-user.dto';
import { ReportsUserService } from 'src/reports/service/user/reports-user.service';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PageMetaDto } from '../dto/page-meta.dto';
import { PageDto } from '../dto/page.dto';
import { UserDTO } from '../dto/user.dto';
import { PageService } from './page.service';

@Injectable()
export class UsersService extends PageService{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, 
    private reportsUserService: ReportsUserService
  ) { 
    super()
  }

  async find(query: any): Promise<User[] | null> {
    try {
      if(query.username) return await this.userRepository.find({ where: { isActive: true, username: ILike(`%${query.username}%`) }})

      if(query.email) return await this.userRepository.find({ where: { isActive: true, email: ILike(`%${query.email}%`) }})

      if(!query.email && !query.username) return await this.userRepository.find({ where: { isActive: true}})
      
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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserDTO>> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user')

      queryBuilder
        .orderBy('user.joinAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)

      const itemCount = await queryBuilder.getCount()
      const { entities } = await queryBuilder.getRawAndEntities()

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto})

      return new PageDto(entities, pageMetaDto)

    } catch (err) {
      return err.message
    }
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
 