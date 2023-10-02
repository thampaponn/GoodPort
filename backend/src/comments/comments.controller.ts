import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Comments } from './comments.model';
import { CommentsService } from './comments.service';

@Controller('comment')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

  @Post()
  async createComment(@Body() commentData: Comments): Promise<Comments> {
    return this.commentService.createComment(commentData);
  }

  @Get()
  async getAllComment(): Promise<Comments[]> {
    return this.commentService.getAllComment();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string): Promise<Comments | null> {
    return this.commentService.getCommentById(id);
  }

  @Delete(':id')
  async deleteCommentById(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.commentService.delCommentById(id);
    if (result.deletedCount === 1) {
      return { message: 'Comment deleted successfully' };
    }
    throw new NotFoundException('Comment not found');
  }

  @Get('byUserId/:userId')
  async getCommentByUserId(@Param('userId') userId: string): Promise<Comments[]> {
    return this.commentService.getCommentByUserId(userId);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updatedData: Partial<Comments>
  ): Promise<Comments | null> {
    return this.commentService.updateComment(id, updatedData);
  }
}
