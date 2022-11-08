import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { ReplyEntity } from './entities/replies.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ReplyEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
