import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostAdvisor } from "./post-advisor.model";

@Injectable()
export class PostAdvisorService {
  constructor(
    @InjectModel("PostAdvisor")
    private readonly postAdvisorModel: Model<PostAdvisor>
  ) {}

  async createPost(PostAdvisor: PostAdvisor): Promise<PostAdvisor> {
    const createPost = new this.postAdvisorModel(PostAdvisor);
    return createPost.save();
  }

  async getAllPost() {
    return await this.postAdvisorModel.find().exec();
  }

  async getPostById(id: string) {
    return await this.postAdvisorModel.findById(id);
  }

  async delPostById(id: string) {
    return await this.postAdvisorModel.deleteOne({ _id: Object(id) });
  }

  async updatePost(
    id: string,
    updatedData: Partial<PostAdvisor>
  ): Promise<PostAdvisor | null> {
    const post = await this.postAdvisorModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );
    return post;
  }
}
