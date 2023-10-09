enum UserRole {
  Advisor = "advisor",
  Student = "student",
  Visitor = "visitor",
}

enum UserSex {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type User = {
  id: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
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
  createdAt: Date;
};
