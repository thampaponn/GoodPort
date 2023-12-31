import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { PostAdvisor } from "./post-advisor.model";
import { PostAdvisorService } from "./post-advisor.service";

@Controller("post-advisor")
export class PostAdvisorController {
  constructor(private readonly PostAdvisorService: PostAdvisorService) {}

  @Post()
  async createPost(@Body() postAdvisor: PostAdvisor) {
    const createPost = await this.PostAdvisorService.createPost(postAdvisor);
    return createPost;
  }

  @Get()
  async getAllPost() {
    const users = await this.PostAdvisorService.getAllPost();
    return users;
  }

  @Post(":id")
  async getPostById(@Param("id") id: string) {
    const user = await this.PostAdvisorService.getPostById(id);
    return user;
  }

  @Post('/addComment/:postId')
  async addComment(@Param('postId') postId: string, @Body() commentData: any) {
    try {
      const updatedPost = await this.PostAdvisorService.addCommentToPost(postId, commentData);
      return updatedPost;
    } catch (error) {
      throw new NotFoundException("ไม่พบโพสต์ที่ต้องการเพิ่มความคิดเห็น");
    }
  }

  @Get('getByUserId/:userId')
  async getPostsByUserId(@Param('userId') userId: string) {
    try {
      const posts = await this.PostAdvisorService.getPostByUserId(userId);
      return posts;
    } catch (e) {
      throw new NotFoundException('Posts not found');
    }
  }

  @Put(":id")
  async updatePost(
    @Param("id") id: string,
    @Body() updatedData: Partial<PostAdvisor>
  ) {
    const updatedUser = await this.PostAdvisorService.updatePost(
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
    const post = await this.PostAdvisorService.delPostById(id);
    return "delete success";
  }
}
