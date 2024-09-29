import { z } from "zod";

export const sendContentSchema = z.object({
  content: z.string().max(1000),
});
