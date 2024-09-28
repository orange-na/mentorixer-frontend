import { MBTI } from "@/utils/constant";
import { z } from "zod";

export const createFriendSchema = z.object({
  name: z.string().max(30),
  mbti: z.enum(MBTI),
  gender: z.enum(["0", "1", "2"]),
  age: z.number().int().positive(),
  description: z.string().max(1000).optional(),
});
