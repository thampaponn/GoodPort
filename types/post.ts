export enum PostCategory {
  learning = "learning",
  activity = "activity",
  internship = "internship",
  volunteer = "volunteer",
  other = "other",
}


export enum PostStatus {
  submited = "submited",
  accepted = "accepted",
}

export type owner = {
  userId: string;
  fname: string;
  lname: string;
  email: string;
};

export type advisor = {
  fname?: string;
  lname?: string;
  email?: string;
  professorId?: string;
};

export type post = {
  nameTh: string;
  nameEn: string;
  category: PostCategory;
  objective?: string;
  source?: string;
  detail?: string;
  image?: string;
  file?: string;
  advisor?:advisor;
  owner: owner;
  status: PostStatus;
  createAt: Date;
  editAt: Date;
};
