import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './post.model';

@Injectable()
export class PostService {
    constructor(
        @InjectModel("Post")
        private readonly postModel: Model<Posts>
      ) {}
    
      async createPost(Post: Posts): Promise<Posts> {
        const createPost = new this.postModel(Post);
        return createPost.save();
      }
    
      async getAllPost() {
        return await this.postModel.find().exec();
      }
    
      async getPostById(id: string) {
        return await this.postModel.findById(id);
      }
    
      async delPostById(id: string) {
        return await this.postModel.deleteOne({ _id: Object(id) });
      }
    
      async updatePost(
        id: string,
        updatedData: Partial<Posts>
      ): Promise<Posts | null> {
        const post = await this.postModel.findByIdAndUpdate(
          id,
          updatedData,
          {
            new: true,
          }
        );
        return post;
      }
}
