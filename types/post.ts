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

export type post = {
  nameTh: string;
  nameEn: string;
  category: PostCategory;
  objective?: string;
  source?: string;
  detail?: string;
  image?: string;
  file?: string;
  advisor?: {
    fname?: string;
    lname?: string;
    email?: string;
    professorId?: string;
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
};
