import { z } from "zod";

const zJob = z.object({
  professorId: z.string().optional(),
  studentId: z.string().optional(),
  title: z.string().optional(),
});

const zImage = z.object({
  studentCard: z.string().optional(),
  profileImage: z.string(),
});

const zInformation = z.object({
  location: z.string().optional(),
  companyNumber: z
    .string()
    .regex(/^0[0-9]{8,10}$/, "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง")
    .optional(),
  graduatedFrom: z.string().optional(),
  university: z.string().optional(),
});

export const zUser = z.object({
  fname: z.string().min(3),
  lname: z.string().min(3),
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]{3,16}$/,
      "กรุณากรอกให้เกิน 3 ตัว และใช้ A-Z 0-9 เท่านั้น"
    ),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "กรุณากรอกให้เกิน 8 ตัวขึ้นไป และใช้ A-Z 0-9 ตัวเล็กและตัวใหญ่อย่างน้อย 1 ตัว และ ตัวเลขอย่างน้อย 1 ตัว"
    ),
  phone: z.string().regex(/^0[0-9]{8,10}$/, "รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง"),
  role: z.string().optional(),
  preflex: z.string().optional(),
  email: z.string().email().optional(),
  job: zJob.optional(),
  image: zImage.optional(),
  information: zInformation.optional(),
});
