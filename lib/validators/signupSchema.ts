import { z } from "zod";
export const signupSchema = z.object({
  email: z.email("invalidEmailFormat").min(1, "emailRequired"),
  password: z.string().min(8, "passwordMinLength"),
});
