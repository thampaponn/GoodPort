import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    fname: string;
    lname: string;
}, mongoose.Document<unknown, {}, {
    fname: string;
    lname: string;
}> & {
    fname: string;
    lname: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
export interface User {
    id: string;
    fname: string;
    lname: string;
}
