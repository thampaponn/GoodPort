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
        return await this.postModel.find().sort({ createAt: -1 }).exec();
      }

      async getPostsCreatedWithinLast7Days(): Promise<Posts[]> {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
        const posts = await this.postModel
          .find({ createAt: { $gte: sevenDaysAgo } })
          .sort({ createAt: -1 })
          .exec();
    
        return posts;
      }
    
      async getPostById(id: string) {
        return await this.postModel.findById(id);
      }

      async getPostsByCategory(category: string) {
        return await this.postModel.find({ category: category }).sort({ createdAt: -1 }).exec();
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
