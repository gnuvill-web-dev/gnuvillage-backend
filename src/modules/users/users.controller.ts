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
import { AuthGuard } from 'src/common/guard/auth.guard';
import { GuardTypes } from 'src/common/decorator/guard-type.decorator';
import { GuardType } from 'src/common/utils/enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(dto);
  }

  @GuardTypes(GuardType.MemberRes)
  @Get('p/:userId')
  async getUserProfile(
    @Param('userId') userId: string,
  ): Promise<ProfileEntity> {
    return this.usersService.getUserProfile(userId);
  }

  @GuardTypes(GuardType.MemberRes)
  @Get('p')
  async getAllUserProfiles(
    @Query() dto: SearchProfilesDto,
  ): Promise<Page<ProfileEntity>> {
    return this.usersService.getAllUserProfiles(dto);
  }

  @GuardTypes(GuardType.SuperUser)
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<UserEntity> {
    return this.usersService.getUser(userId);
  }

  @GuardTypes(GuardType.SuperUser)
  @Get()
  async getAllUsers(@Query() dto: PageRequest): Promise<Page<UserEntity>> {
    return this.usersService.getAllUsers(dto);
  }

  @GuardTypes(GuardType.OwnRes)
  @Patch('p/:userId')
  async editUserProfile(
    @Param('userId') userId: string,
    @Body() dto: EditProfileDto,
  ): Promise<UpdateResult> {
    return this.usersService.editUserProfile(userId, dto);
  }

  @GuardTypes(GuardType.OwnRes)
  @Patch(':userId')
  async editUser(
    @Param('userId') userId: string,
    @Body() dto: EditUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.editUser(userId, dto);
  }

  @GuardTypes(GuardType.SuperUser)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(userId);
  }
}
