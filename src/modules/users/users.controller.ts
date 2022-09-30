import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Page, PageRequest } from 'src/common/utils/page-request';
import { CreateUserDto } from './dto/create-user.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { SearchProfilesDto } from './dto/search-profiles.dto';
import { ProfileEntity } from './entities/profiles.entity';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(dto);
  }

  @Get('p/:userId')
  async getUserProfile(
    @Param('userId') userId: string,
  ): Promise<ProfileEntity> {
    return this.usersService.getUserProfile(userId);
  }

  @Get('p')
  async getAllUserProfiles(
    @Query() dto: SearchProfilesDto,
  ): Promise<Page<ProfileEntity>> {
    return this.usersService.getAllUserProfiles(dto);
  }

  //TODO: jwt인증을 구현했으면 Guard를 이용하여 인가를 구현하기
  @Get(':userId')
  async getUser(@Param('id') userId: string): Promise<UserEntity> {
    return this.usersService.getUser(userId);
  }

  //TODO: jwt인증을 구현했으면 Guard를 이용하여 인가를 구현하기. 관리자만 접근할 수 있도록.
  @Get()
  async getAllUsers(@Query() dto: PageRequest): Promise<Page<UserEntity>> {
    return this.usersService.getAllUsers(dto);
  }

  @Patch('p/:userId')
  async editUserProfile(
    @Param('userId') userId: string,
    @Body() dto: EditProfileDto,
  ): Promise<UpdateResult> {
    return this.usersService.editUserProfile(userId, dto);
  }

  @Patch(':userId')
  async editUser(
    @Param('userId') userId: string,
    @Body() dto: EditUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.editUser(userId, dto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(userId);
  }
}
