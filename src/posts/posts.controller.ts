import { CreatePostDto } from './dtos/CreatePostDto';
import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Body, Get } from '@nestjs/common/decorators';
import { CreateGroupPostDto } from './dtos/CreateGroupPostDto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postsService.createPost(userId, createPostData);
  }

  //POST  posts/group
  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() { userIds, ...createGroupPostData }: CreateGroupPostDto) {
    return this.postsService.createGroupPost(userIds, createGroupPostData)
  }

  @Get('group')
  getGroupPosts() {
    return this.postsService.getGroupPosts()
  }

} 
