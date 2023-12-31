import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { PostService } from "./post.service";
import { Posts } from "./post.model";

@Controller("post")
export class PostController {
  constructor(private readonly PostService: PostService) {}
  @Post()
  async createPost(@Body() post: Posts) {
    const createPost = await this.PostService.createPost(post);
    return createPost;
  }

  @Get('category/:category/:id')
  async getPostsByCategory(@Param('category') category: string, @Param('id') id: string) {
    return this.PostService.getPostsByCategory(category, id);
  }

  @Get()
  async getAllPost() {
    const users = await this.PostService.getAllPost();
    return users;
  }

  @Get('last-7-days')
  async getPostsCreatedWithinLast7Days() {
    const posts = await this.PostService.getPostsCreatedWithinLast7Days();
    return posts;
  }

  @Post('updateStatusToAccepted/:id')
  async updatePostStatusToAccepted(@Param('id') id: string) {
    try {
      const updatedPost = await this.PostService.updatePostStatusToAccepted(id);
      return { message: 'สถานะโพสต์ถูกอัปเดตเป็น "accepted" แล้ว', updatedPost };
    } catch (error) {
      return { message: 'ไม่สามารถอัปเดตสถานะโพสต์', error };
    }
  }

  @Post(":id")
  async getPostById(@Param("id") id: string) {
    const user = await this.PostService.getPostById(id);
    return user;
  }

  @Put(":id")
  async updatePost(
    @Param("id") id: string,
    @Body() updatedData: Partial<Posts>
  ) {
    const updatedUser = await this.PostService.updatePost(
      id,
      updatedData
    );
    if (!updatedUser) {
      throw new NotFoundException(`ไม่พบ ${id}`);
    }
    return updatedUser;
  }

  @Delete(":id")
  async delPostById(@Param("id") id: string) {
    const post = await this.PostService.delPostById(id);
    return "delete success";
  }
}
