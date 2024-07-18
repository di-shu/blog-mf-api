import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

export interface IPost {
  title: string;
  description: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getAllPosts();
  }

  @Post()
  async createPost(@Body() body: IPost) {
    return this.postsService.createPost(body);
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  async updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: IPost,
  ) {
    return this.postsService.updatePostById(id, body);
  }

  @Delete(':id')
  async deletePostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePostById(id);
  }
}
