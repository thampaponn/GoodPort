import { z } from "zod";
const zOwner = z.object({
  userId: z.string(),
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
});
export const zPostAdvisor = z.object({
  detail: z.string().min(3),
  owner: zOwner,
});
