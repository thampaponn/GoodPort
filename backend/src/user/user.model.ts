import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

// Enum สำหรับ Role
enum UserRole {
  Advisor = 'advisor',
  Student = 'student',
  Visitor = 'visitor',
}

// Enum สำหรับเพศ (Sex)
enum UserSex {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  sex: { type: String, enum: Object.values(UserSex), required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  preflex: { type: String },
  email: { type: String },
  job: {
    professorId: { type: String },
    studentId: { type: String },
    title: { type: String },
  },
  image: {
    studentCard: { type: String },
    profileImage: { type: String },
  },
  information: {
    location: { type: String },
    companyNumber: { type: String },
    graduatedFrom: { type: String },
    university: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export class User extends mongoose.Document {
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
}

