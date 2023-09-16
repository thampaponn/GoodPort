import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async inserUser(fname: string, lname: string) {
    const newUser = new this.userModel({ fname, lname });
    const result = await newUser.save();
    console.log(result);
    return 'userId';
  }

  async getUsers() {
    return [...this.users];
  }
}
