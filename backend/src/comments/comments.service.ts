import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comments } from "./comments.model";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel("Comments")
    private readonly commentModel: Model<Comments>
  ) {}

  async createComment(Comment: Comments): Promise<Comments> {
    const createComment = new this.commentModel(Comment);
    return createComment.save();
  }

  async getAllComment() {
    return await this.commentModel.find().exec();
  }

  async getCommentById(id: string) {
    return await this.commentModel.findById(id);
  }

  async delCommentById(id: string) {
    return await this.commentModel.deleteOne({ _id: Object(id) });
  }

  async getCommentByUserId(userId: string): Promise<Comments[]> {
    return this.commentModel.find({ "owner.userId": userId }).exec();
  }

  async updateComment(
    id: string,
    updatedData: Partial<Comments>
  ): Promise<Comments | null> {
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );
    return comment;
  }


}
