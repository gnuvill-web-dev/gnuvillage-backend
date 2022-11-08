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
import { GuardTypes } from 'src/common/decorator/guard-type.decorator';
import { GuardType } from 'src/common/utils/enum';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditAssignmentDto } from './dto/edit-assignment.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { SearchAssignmentsDto } from './dto/search-assignments.dto';
import { SearchGroupsDto } from './dto/search-groups.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @GuardTypes(GuardType.SuperUser)
  @Post()
  async createGroup(@Body() dto: CreateGroupDto) {
    return await this.groupsService.createGroup(dto);
  }

  @GuardTypes(GuardType.GroupAdminRes)
  @Post('a/:groupId')
  async createAssignment(
    @Param('groupId') groupId: number,
    @Body() dto: CreateAssignmentDto,
  ) {
    return await this.groupsService.createAssignment(groupId, dto);
  }

  @Get()
  async getAllGroups(@Query() dto: SearchGroupsDto) {
    return await this.groupsService.getAllGroups(dto);
  }

  @Get('a')
  async getAllAssignments(@Query() dto: SearchAssignmentsDto) {
    return await this.groupsService.getAllAssignments(dto);
  }

  @Get(':groupId')
  async getGroup(@Param('groupId') groupId: number) {
    return await this.groupsService.getGroup(groupId);
  }

  @GuardTypes(GuardType.GroupAdminRes)
  @Patch('a/:groupId/:userId')
  async editAssignment(
    @Param('groupId') groupId: number,
    @Param('userId') userId: string,
    @Body() dto: EditAssignmentDto,
  ) {
    return await this.groupsService.editAssignment(groupId, userId, dto);
  }

  @GuardTypes(GuardType.GroupAdminRes)
  @Patch(':groupId')
  async editGroup(
    @Param('groupId') groupId: number,
    @Body() dto: EditGroupDto,
  ) {
    return await this.groupsService.editGroup(groupId, dto);
  }

  @GuardTypes(GuardType.GroupAdminRes)
  @Delete('a/:groupId/:userId')
  async deleteAssignment(
    @Param('groupId') groupId: number,
    @Param('userId') userId: string,
  ) {
    return await this.groupsService.deleteAssignment(groupId, userId);
  }

  @GuardTypes(GuardType.GroupAdminRes)
  @Delete(':groupId')
  async deleteGroup(@Param('groupId') groupId: number) {
    return await this.groupsService.deleteGroup(groupId);
  }
}
