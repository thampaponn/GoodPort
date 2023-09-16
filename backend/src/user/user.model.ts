import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
});

export interface User {
  id: string;
  fname: string;
  lname: string;
}
