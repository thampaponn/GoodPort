import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const {
      password,
      username,
      ...result
    } = user
    const existingUser = await this.userModel.findOne({ username });

  if (existingUser) {
    throw new Error('Username already exists');
  }
   
    const hashPassword = await bcrypt.hashSync(password,10);
    const createdUser = new this.userModel({
      password: hashPassword,
      username,
      ...result
    });
    return createdUser.save();
  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  async getUsersWithRoles() {
    const rolesToFind = ["advisor", "visitor"];
  
    try {
      const users = await this.userModel
        .find({ role: { $in: rolesToFind } })
        .sort({ fname: 1, lname: 1 })
        .collation({ locale: "th" })
        .exec();
      return users;
    } catch (error) {
      throw error;
    }
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

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
