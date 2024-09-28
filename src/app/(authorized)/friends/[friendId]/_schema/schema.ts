import { z } from "zod";

export const seneContentSchema = z.object({
  content: z.string().max(1000),
});
