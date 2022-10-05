import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { GroupsModule } from './modules/groups/groups.module';
import { RoadmapsModule } from './modules/roadmaps/rmodules/roadmaps.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AuthModule } from './common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './config/ormconfig';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GroupsModule,
    RoadmapsModule,
    SubscriptionsModule,
    AuthModule,
    TypeOrmModule.forRoot(dataSource.options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
