import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Like } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import * as Bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileEntity } from './entities/profiles.entity';
import { SearchProfilesDto } from './dto/search-profiles.dto';
import { Page, PageRequest } from 'src/common/utils/page-request';
import { EditProfileDto } from './dto/edit-profile.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
    private dataSource: DataSource,
  ) {}

  async createUser(dto: CreateUserDto) {
    const userExist = await this.checkUserExists(dto.id);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 아이디로 가입할 수 없습니다.',
      );
    }

    const userEntity = new UserEntity();
    userEntity.id = dto.id;
    const salt = Bcrypt.genSaltSync();
    const bcryptPW = Bcrypt.hashSync(dto.password, salt);
    userEntity.password = bcryptPW;

    const profileEntity = new ProfileEntity();
    profileEntity.user = userEntity;
    profileEntity.name = dto.name;
    profileEntity.email = dto.email;
    profileEntity.phone = dto.phone;
    profileEntity.department = dto.department;
    profileEntity.message = dto.message;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(userEntity);
      await queryRunner.manager.save(profileEntity);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return userEntity;
  }

  private async checkUserExists(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    return user !== undefined && user !== null;
  }

  async getUser(userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    return user;
  }

  async getUserProfile(userId: string) {
    const profile = await this.profilesRepository.findOneBy({
      userId,
    });
    return profile;
  }

  async getAllUsers(dto: PageRequest) {
    const take = dto.getLimit();
    const skip = dto.getOffset();
    const pageSize = dto.pageSize;

    const totalCount = await this.usersRepository.count();
    const list = await this.usersRepository.find({
      take: take,
      skip: skip,
    });

    return new Page(totalCount, pageSize, list);
  }

  async getAllUserProfiles(dto: SearchProfilesDto) {
    const take = dto.getLimit();
    const skip = dto.getOffset();
    const pageSize = dto.pageSize;

    delete dto.pageNo;
    delete dto.pageSize;

    let query: any = Object.assign({}, { ...dto });
    if (query.message !== undefined) {
      query.message = Like(`%${dto.message}%`);
    }

    const totalCount = await this.profilesRepository.count({
      where: { ...query },
    });
    const list = await this.profilesRepository.find({
      take: take,
      skip: skip,
      where: { ...query },
    });

    return new Page(totalCount, pageSize, list);
  }

  async editUserProfile(userId: string, dto: EditProfileDto) {
    const updateResult = await this.profilesRepository.update({ userId }, dto);
    return updateResult;
  }

  async editUser(userId: string, dto: EditUserDto) {
    const salt = Bcrypt.genSaltSync();
    const bcryptPW = Bcrypt.hashSync(dto.password, salt);
    const updateResult = await this.usersRepository.update(
      { id: userId },
      { password: bcryptPW },
    );
    return updateResult;
  }

  async deleteUser(userId: string) {
    const deleteResult = await this.usersRepository.delete({ id: userId });
    return deleteResult;
  }
}
