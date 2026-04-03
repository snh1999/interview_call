import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4),
});

export type TLoginDTO = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().min(4).max(100),
});

export type TRegisterDTO = z.infer<typeof registerSchema>;

export interface IAuthPayload {
  id: string;
}
