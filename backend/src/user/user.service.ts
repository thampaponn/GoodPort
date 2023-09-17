import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model"; // แก้ไขตรงนี้ให้สอดคล้อง

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async insertUser(fname: string, lname: string) {
    const newUser = new this.userModel({ fname, lname });
    const result = await newUser.save();
    console.log(result);
    return result.id;
  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }
}
