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
    @Headers('auth-id') authId: string,
  ) {
    return await this.postsService.createPost(dto, authId);
  }

  @Post('a')
  @GuardTypes(GuardType.SuperUser)
  async createOpenAdminPost(
    @Body() dto: CreatePostDto,
    @Headers('auth-id') authId: string,
  ) {
    return await this.postsService.createPost(dto, authId, undefined, true);
  }

  @Post('g/:groupId')
  @GuardTypes(GuardType.GroupRes)
  async createGroupPost(
    @Body() dto: CreatePostDto,
    @Headers('auth-id') authId: string,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.createPost(dto, authId, groupId);
  }

  @Post('g/:groupId/:postId/r')
  @GuardTypes(GuardType.GroupRes)
  async createGroupPostReply(
    @Body() dto: CreateReplyDto,
    @Headers('auth-id') authId: string,
    @Param('postId') postId: number,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.createReply(dto, authId, postId, groupId);
  }

  @Post('ga/:groupId')
  @GuardTypes(GuardType.GroupAdminRes)
  async createGroupAdminPost(
    @Body() dto: CreatePostDto,
    @Headers('auth-id') authId: string,
    @Param('groupId') groupId: number,
  ) {
    return await this.postsService.createPost(dto, authId, groupId, true);
  }

  @Post(':postId/r')
  @GuardTypes(GuardType.MemberRes)
  async createOpenPostReply(
    @Body() dto: CreateReplyDto,
    @Headers('auth-id') authId: string,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.createReply(dto, authId, postId);
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
    @Param('userId') userId: string,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editPost(dto, postId, userId, groupId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Patch('g/:groupId/:postId/r/:replyId')
  async editGroupPostReply(
    @Body() dto: EditReplyDto,
    @Param('userId') userId: string,
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

  @GuardTypes(GuardType.OwnRes)
  @Patch(':postId')
  async editOpenPost(
    @Body() dto: EditPostDto,
    @Param('userId') userId: string,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editPost(dto, postId, userId);
  }

  @GuardTypes(GuardType.OwnRes)
  @Patch(':postId/r/:replyId')
  async editOpenPostReply(
    @Body() dto: EditReplyDto,
    @Param('userId') userId: string,
    @Param('replyId') replyId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.editReply(dto, replyId, postId, userId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Delete('g/:groupId/:postId')
  async deleteGroupPost(
    @Param('userId') userId: string,
    @Param('groupId') groupId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deletePost(postId, userId, groupId);
  }

  @GuardTypes(GuardType.GroupAdminRes, GuardType.OwnRes)
  @Delete('g/:groupId/:postId/r/:replyId')
  async deleteGroupPostReply(
    @Param('userId') userId: string,
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
    @Param('userId') userId: string,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deletePost(postId, userId);
  }

  @GuardTypes(GuardType.OwnRes)
  @Delete(':postId/r/:replyId')
  async deleteOpenPostReply(
    @Param('userId') userId: string,
    @Param('replyId') replyId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postsService.deleteReply(replyId, postId, userId);
  }
}
