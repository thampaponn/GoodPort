import * as mongoose from "mongoose";

export const AlertSchema = new mongoose.Schema({
  owner: {
    userId: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
  },
  postId: { type: String, required: true },
  postTitle: { type: String },
  postCategory: { type: String },
  advisorId: { type: String },
  advisorFname: { type: String },
  advisorLname: { type: String },
  detail: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

export interface Alert extends mongoose.Document {
  id: string;
  owner: {
    userId: string;
    fname: string;
    lname: string;
  };
  postId: string;
  postTitle: string;
  postCategory: string;
  advisorId: string;
  advisorFname: string;
  advisorLname: string;
  detail: string;
  createAt: Date;
}
