export enum UserRole {
  Advisor = "advisor",
  Student = "student",
  Visitor = "visitor",
}

export enum UserSex {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum PostCategory {
  Learning = "learning",
  Activity = "activity",
  Internship = "internship",
  Volunteer = "volunteer",
  Other = "other",
}

// The API stores this exact spelling, so it can't be corrected on the client alone.
export enum PostStatus {
  Submitted = "submited",
  Accepted = "accepted",
}

export type User = {
  _id: string;
  fname: string;
  lname: string;
  username: string;
  sex: UserSex;
  phone: string;
  role: UserRole;
  preflex?: string;
  email?: string;
  job?: {
    professorId?: string;
    studentId?: string;
    title?: string;
  };
  image?: {
    studentCard?: string;
    profileImage?: string;
  };
  information?: {
    location?: string;
    companyNumber?: string;
    graduatedFrom?: string;
    university?: string;
  };
  createdAt: string;
};

export type JwtUser = Pick<User, "_id" | "fname" | "lname" | "email">;

export type PostOwner = {
  userId: string;
  fname: string;
  lname: string;
  email: string;
};

export type PostAdvisorRef = {
  userId?: string | null;
  fname?: string;
  lname?: string;
  email?: string;
};

export type Post = {
  _id: string;
  nameTh: string;
  nameEn: string;
  category: PostCategory;
  objective?: string;
  source?: string;
  detail?: string;
  image?: string;
  file?: string;
  advisor?: PostAdvisorRef;
  owner: PostOwner;
  status: PostStatus;
  createAt: string;
  editAt: string;
};

export type NewPost = Omit<Post, "_id" | "createAt" | "editAt">;

export type AdvisorPostComment = {
  _id?: string;
  userId?: string;
  image?: string;
  fname?: string;
  lname?: string;
  detail?: string;
  createAt?: string;
};

export type AdvisorPost = {
  _id: string;
  detail: string;
  image?: string;
  createAt: string;
  editAt: string;
  owner: Partial<PostOwner> & { image?: string };
  comments?: AdvisorPostComment[];
};

export type NewAdvisorPost = Pick<AdvisorPost, "detail" | "image" | "owner">;

export type Alert = {
  _id: string;
  owner: Pick<PostOwner, "userId" | "fname" | "lname">;
  postId: string;
  postTitle: string;
  postCategory: PostCategory;
  advisorId?: string | null;
  advisorFname?: string;
  advisorLname?: string;
  detail: string;
  createAt: string;
};

export type NewAlert = Omit<Alert, "_id" | "createAt">;
