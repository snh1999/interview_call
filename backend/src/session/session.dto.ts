import { z } from "zod";
import { SessionDifficultyEnum } from "./Session.model.js";

export const createSessionSchema = z.object({
	problem: z.string(),
	difficulty: z.enum(SessionDifficultyEnum),
});

export type TCreateSessionDTO = z.infer<typeof createSessionSchema>;

export const sessionParamsSchema = z.object({
	id: z.uuid("Invalid session ID"),
});

export type TSessionParams = z.infer<typeof sessionParamsSchema>;
