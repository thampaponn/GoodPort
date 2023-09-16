import { User } from './user.model';
import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    private users;
    constructor(userModel: Model<User>);
    inserUser(fname: string, lname: string): Promise<string>;
    getUsers(): Promise<User[]>;
}
