import * as mongoose from "mongoose";

export const PostAdvisorSchema = new mongoose.Schema({
  detail: { type: String, required: true },
  image: { type: String },
  createAt: { type: Date, default: Date.now },
  editAt: { type: Date, default: Date.now },
  owner: {
    userId: { type: String },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    image: { type: String },
  },
  comments: [
    {
      userId: { type: String },
      image: { type: String },
      fname: { type: String },
      lname: { type: String },
      detail: { type: String },
      createAt: { type: Date, default: Date.now },
    },
  ],
});

export interface PostAdvisor extends mongoose.Document {
  id: string;
  detail: string;
  image: string;
  createAt: Date;
  editAt: Date;
  owner: {
    userId?: string;
    fname?: string;
    lname?: string;
    email?: string;
    image?: string;
  };
  comments?: {
    userId?: string;
    image?: string;
    fname?: string;
    lname?: string;
    detail?: string;
    createAt?: Date;
  }[];
}
