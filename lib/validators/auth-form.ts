import { z } from "zod";

export const authFormValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TAuthFormValidator = z.infer<typeof authFormValidator>;
