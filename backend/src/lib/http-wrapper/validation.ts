import type { z } from "zod";
import { ValidationError } from "./error.js";

export type ValidationResult<T> =
	| { success: true; data: T }
	| { success: false; error: ValidationError };

export function validate<T>(
	schema: z.ZodSchema<T>,
	data: unknown,
): ValidationResult<T> {
	const result = schema.safeParse(data);

	if (result.success) {
		return { success: true, data: result.data };
	}

	const details = formatZodErrors(result.error);
	const validationError = new ValidationError("Validation failed", details);

	return { success: false, error: validationError };
}

function formatZodErrors(error: z.ZodError): Record<string, string> {
	const details: Record<string, string> = {};

	for (const issue of error.issues) {
		const path = issue.path.join(".");
		details[path] = issue.message;
	}

	return details;
}

export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
	const result = validate(schema, data);

	if (!result.success) {
		throw result.error;
	}

	return result.data;
}
