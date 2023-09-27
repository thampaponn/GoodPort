import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async delUserById(id: string) {
    return await this.userModel.deleteOne({ _id: Object(id) });
  }

  async updateUser(id: string,updatedData: Partial<User>): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return user;
  }

  async searchUsers(query: string): Promise<User[]> {
    const users = await this.userModel.find({ fname: { $regex: `.*${query}.*` } }).exec();
    return users;
  }
}
