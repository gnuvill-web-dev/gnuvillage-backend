import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { AssignedGroupEntity } from './entities/assigned-groups.entity';
import { GroupEntity } from './entities/groups.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, AssignedGroupEntity])],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GroupsModule {}
