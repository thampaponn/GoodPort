import * as mongoose from "mongoose";

enum PostCategory {
  learning = "learning",
  activity = "activity",
  internship = "internship",
  volunteer = "volunteer",
  other = "other",
}

enum PostStatus {
  submited = "submited",
  accepted = "accepted",
}

export const PostSchema = new mongoose.Schema({
  nameTh: { type: String, required: true },
  nameEn: { type: String, required: true },
  category: { type: String, enum: Object.values(PostCategory), required: true },
  objective: { type: String, required: true },
  source: { type: String, required: true },
  detail: { type: String, required: true },
  image: [String],
  file: [String],
  advisor: {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    professorId: { type: String, required: true },
  },
  owner: {
    userId: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
  },
  status: { type: String, enum: Object.values(PostStatus), required: true },
  createAt: { type: Date, default: Date.now },
  editAt: { type: Date, default: Date.now },
});

export interface Post extends mongoose.Document {
  id: string;
  nameTh: string;
  nameEn: string;
  category: PostCategory;
  objective: string;
  source: string;
  detail: string;
  image: string[];
  file: string[];
  advisor: {
    fname: string;
    lname: string;
    email: string;
    professorId: string;
  };
  owner: {
    userId: string;
    fname: string;
    lname: string;
    email: string;
  };
  status: PostStatus;
  createAt: Date;
  editAt: Date;
}
