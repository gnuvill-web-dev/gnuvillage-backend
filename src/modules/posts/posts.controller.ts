import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GuardTypes } from 'src/common/decorator/guard-type.decorator';
import { GuardType } from 'src/common/utils/enum';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { EditReplyDto } from './dto/edit-reply.dto';
import { SearchPostsDto } from './dto/search-posts.dto';
import { SearchRepliesDto } from './dto/search-replies.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('')
  @GuardTypes(GuardType.MemberRes)
  async createOpenPost(
    @Body() dto: CreatePostDto,
    @Headers('user-id') userId: string,
  ) {
    return await this.postsService.createPost(dto, userId);
  }

  @Post('g/:groupId')
  @GuardTypes(GuardType.GroupRes)
  async createGroupPost(
    @Body() dto: CreatePostDto,
    @Headers('user-id') userId: string,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.createPost(dto, userId, groupId);
  }

  @Post('g/:groupId/:postId/r')
  @GuardTypes(GuardType.GroupRes)
  async createGroupPostReply(
    @Body() dto: CreateReplyDto,
    @Headers('user-id') userId: string,
    @Param('postId') postId: number,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.createReply(dto, userId, postId, groupId);
  }

  @Post('ga/:groupId')
  @GuardTypes(GuardType.GroupAdminRes)
  async createGroupAdminPost(
    @Body() dto: CreatePostDto,
    @Headers('user-id') userId: string,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.createPost(dto, userId, groupId, true);
  }

  @Post(':postId/r')
  @GuardTypes(GuardType.MemberRes)
  async createOpenPostReply(
    @Body() dto: CreateReplyDto,
    @Headers('user-id') userId: string,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.createReply(dto, userId, postId);
  }

  @Get('')
  async getAllOpenPosts(@Query() dto: SearchPostsDto) {
    return await this.postsService.getAllPosts(dto);
  }

  @GuardTypes(GuardType.GroupRes)
  @Get('g/:groupId/:postId')
  async getGroupPost(
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.getPost(postId, groupId);
  }

  @GuardTypes(GuardType.GroupRes)
  @Get('g/:groupId/:postId/r')
  async getAllGroupPostReplies(
    @Query() dto: SearchRepliesDto,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.getAllReply(dto, postId, groupId);
  }

  @GuardTypes(GuardType.GroupRes)
  @Get('g/:groupId/:postId/r/:replyId')
  async getGroupPostReply(
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
    @Param('replyId') replyId: number,
  ) {
    return await this.postsService.getReply(replyId, postId, groupId);
  }

  @GuardTypes(GuardType.GroupRes)
  @Get('g/:groupId')
  async getAllGroupPosts(
    @Query() dto: SearchPostsDto,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.getAllPosts(dto, groupId);
  }

  @GuardTypes(GuardType.MemberRes)
  @Get(':postId')
  async getOpenPost(@Param('postId') postId: number) {
    return await this.postsService.getPost(postId);
  }

  @GuardTypes(GuardType.MemberRes)
  @Get(':postId/r')
  async getAllOpenPostReply(
    @Query() dto: SearchRepliesDto,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.getAllReply(dto, postId);
  }

  @GuardTypes(GuardType.MemberRes)
  @Get(':postId/r/:replyId')
  async getOpenPostReply(
    @Param('postId') postId: number,
    @Param('replyId') replyId: number,
  ) {
    return await this.postsService.getReply(replyId, postId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Patch('g/:groupId/:postId')
  async editGroupPost(
    @Body() dto: EditPostDto,
    @Headers('user-id') userId: string,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editPost(dto, postId, userId, groupId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Patch('g/:groupId/:postId/r/:replyId')
  async editGroupPostReply(
    @Body() dto: EditReplyDto,
    @Headers('user-id') userId: string,
    @Param('replyId') replyId: number,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editReply(
      dto,
      replyId,
      postId,
      userId,
      groupId,
    );
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Patch(':postId')
  async editOpenPost(
    @Body() dto: EditPostDto,
    @Headers('user-id') userId: string,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editPost(dto, postId, userId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Patch(':postId/r/:replyId')
  async editOpenPostReply(
    @Body() dto: EditReplyDto,
    @Headers('user-id') userId: string,
    @Param('replyId') replyId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editReply(dto, replyId, postId, userId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Delete('g/:groupId/:postId')
  async deleteGroupPost(
    @Headers('user-id') userId: string,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deletePost(postId, userId, groupId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Delete('g/:groupId/:postId/r/:replyId')
  async deleteGroupPostReply(
    @Headers('user-id') userId: string,
    @Param('replyId') replyId: number,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deleteReply(
      replyId,
      postId,
      userId,
      groupId,
    );
  }

  @GuardTypes(GuardType.OwnRes)
  @Delete(':postId')
  async deleteOpenPost(
    @Headers('user-id') userId: string,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deletePost(postId, userId);
  }

  @GuardTypes(GuardType.OwnRes)
  @Delete(':postId/r/:replyId')
  async deleteOpenPostReply(
    @Headers('user-id') userId: string,
    @Param('replyId') replyId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deleteReply(replyId, postId, userId);
  }
}
