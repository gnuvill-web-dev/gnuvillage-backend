import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { GroupsModule } from './modules/groups/groups.module';
import { RoadmapsModule } from './modules/roadmaps/roadmaps.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AuthModule } from './common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './config/ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { GroupsService } from './modules/groups/groups.service';
import { GroupEntity } from './modules/groups/entities/groups.entity';
import { AssignedGroupEntity } from './modules/groups/entities/assigned-groups.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GroupsModule,
    RoadmapsModule,
    SubscriptionsModule,
    AuthModule,
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([GroupEntity, AssignedGroupEntity]),
  ],
  controllers: [],
  providers: [
    GroupsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
