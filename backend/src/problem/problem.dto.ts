import { z } from "zod";

const languageDataSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  starterCode: z.string().min(1, "Starter code is required"),
  expectedOutput: z.string().min(1, "Expected output is required"),
});

export const createProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  description: z.object({
    text: z.string().min(1, "Description text is required"),
    notes: z.array(z.string()).default([]),
  }),
  examples: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string().optional(),
    })
  ),
  constraints: z.array(z.string()),
  languages: z
    .array(languageDataSchema)
    .min(1, "At least one language is required"),
  slug: z.string().min(1).nullable(),
});

export type TCreateProblemDTO = z.infer<typeof createProblemSchema>;

export const updateProblemSchema = createProblemSchema.partial();

export type TUpdateProblemDTO = z.infer<typeof updateProblemSchema>;

export const problemParamsSchema = z.object({
  id: z.string().min(1, "Problem ID is required"),
});

export type TProblemParams = z.infer<typeof problemParamsSchema>;
