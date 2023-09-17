import * as mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  owner: {
    userId: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
  },
  detail: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

export interface Comment extends mongoose.Document {
  id: string;
  owner: {
    userId: string;
    fname: string;
    lname: string;
  };
  detail: string;
  createAt: Date;
}
