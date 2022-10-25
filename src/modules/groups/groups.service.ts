import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditAssignmentDto } from './dto/edit-assignment.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { SearchAssignmentsDto } from './dto/search-assignments.dto';
import { SearchGroupsDto } from './dto/search-groups.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './entities/groups.entity';
import { AssignedGroupEntity } from './entities/assigned-groups.entity';
import { Page } from 'src/common/utils/page-request';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupsRepository: Repository<GroupEntity>,
    @InjectRepository(AssignedGroupEntity)
    public assignedGroupsRepository: Repository<AssignedGroupEntity>,
  ) {}

  async createGroup(dto: CreateGroupDto) {
    const group = new GroupEntity();
    group.name = dto.name;
    group.description = dto.description;

    return await this.groupsRepository.save(group);
  }

  async createAssignment(groupId: number, dto: CreateAssignmentDto) {
    const assignedGroup = new AssignedGroupEntity();
    assignedGroup.groupId = groupId;
    assignedGroup.userId = dto.userId;
    assignedGroup.admin = dto.admin;

    return await this.assignedGroupsRepository.save(assignedGroup);
  }

  async getAllGroups(dto: SearchGroupsDto) {
    const take = dto.getLimit();
    const skip = dto.getOffset();
    const pageSize = dto.pageSize;

    delete dto.pageNo;
    delete dto.pageSize;

    let query: any = Object.assign({}, { ...dto });
    if (query.description !== undefined) {
      query.description = Like(`%${dto.description}%`);
    }

    const totalCount = await this.groupsRepository.count({
      where: { ...query },
    });
    const list = await this.groupsRepository.find({
      take: take,
      skip: skip,
      where: { ...query },
    });

    return new Page(totalCount, pageSize, list);
  }

  async getAllAssignments(dto: SearchAssignmentsDto) {
    const take = dto.getLimit();
    const skip = dto.getOffset();
    const pageSize = dto.pageSize;

    delete dto.pageNo;
    delete dto.pageSize;

    let query: any = Object.assign({}, { ...dto });

    const totalCount = await this.assignedGroupsRepository.count({
      where: { ...query },
    });
    const list = await this.assignedGroupsRepository.find({
      take: take,
      skip: skip,
      where: { ...query },
    });

    return new Page(totalCount, pageSize, list);
  }

  async getGroup(groupId: number) {
    return await this.groupsRepository.findOneBy({
      id: groupId,
    });
  }

  async getAssignment(groupId: number) {
    return await this.assignedGroupsRepository.findOneBy({
      groupId,
    });
  }

  async editGroup(groupId: number, dto: EditGroupDto) {
    const updateResult = await this.groupsRepository.update(
      { id: groupId },
      dto,
    );
    return updateResult;
  }

  async editAssignment(
    groupId: number,
    userId: string,
    dto: EditAssignmentDto,
  ) {
    const updateResult = await this.assignedGroupsRepository.update(
      { groupId, userId },
      dto,
    );
    return updateResult;
  }

  async deleteGroup(groupId: number) {
    const deleteResult = await this.groupsRepository.delete({ id: groupId });
    return deleteResult;
  }

  async deleteAssignment(groupId: number, userId: string) {
    const deleteResult = await this.assignedGroupsRepository.delete({
      groupId,
      userId,
    });
    return deleteResult;
  }
}
