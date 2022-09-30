import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcryptjs';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async login(dto: LoginDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: dto.id });
    if (user === undefined || user === null)
      throw new UnprocessableEntityException(
        '해당 아이디가 존재하지 않습니다.',
      );
    if (Bcrypt.compareSync(dto.password, user.password) === false)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    const payload = { userId: user.id };
    return jwt.sign(payload, process.env.AUTH_JWT_KEY, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  async logout(): Promise<void> {}
}
