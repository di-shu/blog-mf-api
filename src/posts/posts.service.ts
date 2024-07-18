import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPost } from './posts.controller';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const posts: IPost[] = await this.prismaService.posts.findMany({
      orderBy: [{ created_at: 'desc' }],
    });
    if (!posts.length) {
      throw new NotFoundException();
    }

    return posts;
  }

  async createPost(body: IPost) {
    await this.prismaService.posts.create({ data: body });
  }

  async getPostById(postId: number) {
    const post: IPost = await this.prismaService.posts.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async updatePostById(postId: number, body: IPost) {
    const post: IPost = await this.prismaService.posts.update({
      where: { id: postId },
      data: body,
    });

    return post;
  }

  async deletePostById(postId: number) {
    await this.prismaService.posts.delete({ where: { id: postId } });
  }
}
