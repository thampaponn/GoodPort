import * as mongoose from 'mongoose';
declare enum UserRole {
    Advisor = "advisor",
    Student = "student",
    Visitor = "visitor"
}
declare enum UserSex {
    Male = "male",
    Female = "female",
    Other = "other"
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    fname: string;
    lname: string;
    username: string;
    password: string;
    sex: UserSex;
    phone: string;
    role: UserRole;
    createdAt: Date;
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
}, mongoose.Document<unknown, {}, {
    fname: string;
    lname: string;
    username: string;
    password: string;
    sex: UserSex;
    phone: string;
    role: UserRole;
    createdAt: Date;
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
}> & {
    fname: string;
    lname: string;
    username: string;
    password: string;
    sex: UserSex;
    phone: string;
    role: UserRole;
    createdAt: Date;
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
} & {
    _id: mongoose.Types.ObjectId;
}>;
export declare class User extends mongoose.Document {
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
export {};
