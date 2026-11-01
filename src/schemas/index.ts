import { z } from "zod";
import { PostCategory, UserRole, UserSex } from "../types/models";

const THREE_CHARS = "กรุณากรอกอย่างน้อย 3 ตัวอักษร";
const PHONE_MESSAGE = "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง";
const EMAIL_MESSAGE = "รูปแบบอีเมลไม่ถูกต้อง";

const phone = z.string().regex(/^0[0-9]{8,10}$/, PHONE_MESSAGE);
const nameField = z.string().min(3, THREE_CHARS);
const email = z.string().email(EMAIL_MESSAGE);

export const signUpSchema = z.object({
  fname: nameField,
  lname: nameField,
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{3,16}$/, "ใช้ A-Z, 0-9, _ หรือ - ความยาว 3-16 ตัวอักษร"),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "อย่างน้อย 8 ตัวอักษร มีตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข"
    ),
  phone,
  email,
  sex: z.nativeEnum(UserSex),
  role: z.nativeEnum(UserRole),
  preflex: z.string().optional(),
  job: z
    .object({
      professorId: z.string().optional(),
      studentId: z.string().optional(),
      title: z.string().optional(),
    })
    .optional(),
  information: z
    .object({
      location: z.string().optional(),
      companyNumber: phone.or(z.literal("")).optional(),
      graduatedFrom: z.string().optional(),
      university: z.string().optional(),
    })
    .optional(),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const profileSchema = z.object({
  fname: nameField,
  lname: nameField,
  phone,
  email,
});

export type ProfileValues = z.infer<typeof profileSchema>;

export const postSchema = z.object({
  nameTh: nameField,
  nameEn: nameField,
  category: z.nativeEnum(PostCategory),
  objective: z.string().optional(),
  source: z.string().optional(),
  detail: z.string().optional(),
});

export type PostValues = z.infer<typeof postSchema>;

export const advisorPostSchema = z.object({
  detail: nameField,
});

export type AdvisorPostValues = z.infer<typeof advisorPostSchema>;
