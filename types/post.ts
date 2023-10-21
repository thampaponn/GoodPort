import { advisor } from "./advisor";
import { PostCategory } from "./postCategory";
import { owner } from "./postOwner";
import { PostStatus } from "./postStatus";

export type post = {
  _id:string;
  nameTh: string;
  nameEn: string;
  category: PostCategory;
  objective?: string;
  source?: string;
  detail?: string;
  image?: string;
  file?: string;
  advisor?: advisor;
  owner: owner;
  status: PostStatus;
  createAt: Date;
  editAt: Date;
};
