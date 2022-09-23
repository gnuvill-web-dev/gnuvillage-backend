import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { GroupsModule } from './modules/groups/groups.module';
import { RoadmapsModule } from './modules/roadmaps/roadmaps.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AuthModule } from './common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GroupsModule,
    RoadmapsModule,
    SubscriptionsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT as unknown as number,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE as unknown as boolean,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: process.env.DATABASE_MIGRATIONS_RUN as unknown as boolean,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
