import * as mongoose from 'mongoose';

export const PostAdvisorSchema = new mongoose.Schema({
  detail: { type: String, required: true },
  image: [String],
  createAt: { type: Date, default: Date.now },
  editAt: { type: Date, default: Date.now },
  owner: {
    userId: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
  },
});

export interface PostAdvisor extends mongoose.Document {
  id: string;
  detail: string;
  image: string[];
  createAt: Date;
  editAt: Date;
  owner: {
    userId: string;
    fname: string;
    lname: string;
    email: string;
  };
}

