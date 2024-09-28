import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const signUpSchema = z.object({
  name: z.string().max(30),
  email: z.string().email(),
  password: z.string().regex(passwordRegex),
});
