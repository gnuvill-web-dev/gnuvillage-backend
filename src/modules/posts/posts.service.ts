import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository, DataSource, Like, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { SearchPostsDto } from './dto/search-posts.dto';
import { Page } from 'src/common/utils/page-request';
import { EditPostDto } from './dto/edit-post.dto';
import { ReplyEntity } from './entities/replies.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { SearchRepliesDto } from './dto/search-replies.dto';
import { EditReplyDto } from './dto/edit-reply.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(ReplyEntity)
    private repliesRepository: Repository<ReplyEntity>,
  ) {}

  async createPost(
    dto: CreatePostDto,
    userId: string,
    groupId?: number,
    admin: boolean = false,
  ) {
    const post = new PostEntity();
    post.userId = userId;
    if (groupId !== undefined) post.groupId = groupId;
    post.title = dto.title;
    post.content = dto.content;
    post.category = dto.category;
    post.admin = admin;

    return await this.postsRepository.save(post);
  }

  async createReply(
    dto: CreateReplyDto,
    userId: string,
    postId: number,
    groupId?: number,
  ) {
    const reply = new ReplyEntity();
    reply.userId = userId;
    reply.postId = postId;
    if (groupId !== undefined) reply.groupId = groupId;
    reply.content = dto.content;

    return await this.repliesRepository.save(reply);
  }

  async getAllPosts(dto: SearchPostsDto, groupId?: number) {
    const take = dto.getLimit();
    const skip = dto.getOffset();
    const pageSize = dto.pageSize;

    delete dto.pageNo;
    delete dto.pageSize;

    let query: any = Object.assign({}, { ...dto });
    if (query.title !== undefined) {
      query.title = Like(`%${dto.title}%`);
    }
    if (query.content !== undefined) {
      query.content = Like(`%${dto.content}%`);
    }

    if (groupId === undefined) {
      query.groupId = IsNull();
    } else {
      query.groupId = groupId;
    }

    const totalCount = await this.postsRepository.count({
      where: { ...query },
    });
    const list = await this.postsRepository.find({
      take: take,
      skip: skip,
      order: {id:"DESC"},
      where: { ...query },
    });

    return new Page(totalCount, pageSize, list);
  }

  async getAllReply(dto: SearchRepliesDto, postId: number, groupId?: number) {
    const take = dto.getLimit();
    const skip = dto.getOffset();
    const pageSize = dto.pageSize;

    delete dto.pageNo;
    delete dto.pageSize;

    let query: any = Object.assign({}, { ...dto });
    if (query.content !== undefined) {
      query.content = Like(`%${dto.content}%`);
    }

    if (groupId === undefined) {
      query.groupId = IsNull();
    } else {
      query.groupId = groupId;
    }

    const totalCount = await this.repliesRepository.count({
      where: { ...query },
    });
    const list = await this.repliesRepository.find({
      take: take,
      skip: skip,
      where: { ...query },
    });

    return new Page(totalCount, pageSize, list);
  }

  async getPost(postId: number, groupId?: number) {
    let post;
    if (groupId === undefined) {
      post = await this.postsRepository.findOneBy({
        id: postId,
        groupId: IsNull(),
      });
    } else {
      post = await this.postsRepository.findOneBy({
        id: postId,
        groupId,
      });
    }
    
    if(post === null)
        throw new NotFoundException;
    return post;
  }

  async getReply(replyId: number, postId: number, groupId?: number) {
    let reply;
    if (groupId === undefined) {
      reply = await this.repliesRepository.findOneBy({
        id: replyId,
        postId,
        groupId: IsNull(),
      });
    } else {
      reply = await this.repliesRepository.findOneBy({
        id: replyId,
        postId,
        groupId,
      });
    }
    
    if(reply === null)
        throw new NotFoundException;
    return reply;
  }

  async editPost(
    dto: EditPostDto,
    postId: number,
    userId: string,
    groupId?: number,
  ) {
    let query: any = {};

    query.id = postId;
    if (userId !== undefined) query.userId = userId;
    if (groupId === undefined) query.groupId = IsNull();
    else query.groupId = groupId;

    const updateResult = await this.postsRepository.update(query, dto);
    return updateResult;
  }

  async editReply(
    dto: EditReplyDto,
    replyId: number,
    postId: number,
    userId: string,
    groupId?: number,
  ) {
    let query: any = {};

    query.id = replyId;
    query.postId = postId;
    if (userId !== undefined) query.userId = userId;
    if (groupId === undefined) query.groupId = IsNull();
    else query.groupId = groupId;

    const updateResult = await this.repliesRepository.update(query, dto);
    return updateResult;
  }

  async deletePost(postId: number, userId: string, groupId?: number) {
    let query: any = {};

    query.id = postId;
    if (userId !== undefined) query.userId = userId;
    if (groupId === undefined) query.groupId = IsNull();
    else query.groupId = groupId;

    const deleteResult = await this.postsRepository.delete(query);
    return deleteResult;
  }

  async deleteReply(
    replyId: number,
    postId: number,
    userId: string,
    groupId?: number,
  ) {
    let query: any = {};

    query.id = replyId;
    query.postId = postId;
    if (userId !== undefined) query.userId = userId;
    if (groupId === undefined) query.groupId = IsNull();
    else query.groupId = groupId;

    const deleteResult = await this.repliesRepository.delete(query);
    return deleteResult;
  }
}
