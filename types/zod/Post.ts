import { z } from "zod";
const zAdvisor = z.object({
  fname: z.string().optional(),
  lname: z.string().optional(),
  email: z.string().optional(),
  professorId: z.string().optional(),
});

const zOwner = z.object({
  userId: z.string(),
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
});

export const zPost = z.object({
  nameTh: z.string().min(3),
  nameEn: z.string().min(3),
  category: z.string(),
  objective: z.string().optional(),
  source: z.string().optional(),
  detail: z.string().optional(),
  image: z.string().optional(),
  file: z.string().optional(),
  owner: zOwner,
  advisor: zAdvisor.optional(),
});
