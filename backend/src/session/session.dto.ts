import { z } from "zod";
import { SessionDifficultyEnum } from "./Session.model.js";

export const createSessionSchema = z.object({
  problem: z.string(),
  difficulty: z.enum(SessionDifficultyEnum),
  email: z.email().optional(),
});

export type TCreateSessionDTO = z.infer<typeof createSessionSchema>;

export const updateSessionSchema = z.object({
  problem: z.string().optional(),
  difficulty: z.enum(SessionDifficultyEnum).optional(),
  email: z.email().optional(),
});

export type TUpdateSessionDTO = z.infer<typeof updateSessionSchema>;

export const sessionParamsSchema = z.object({
  id: z.string("Invalid session ID"),
});

export type TSessionParams = z.infer<typeof sessionParamsSchema>;
