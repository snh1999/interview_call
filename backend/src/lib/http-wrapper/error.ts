import type { TStatusCode } from "./response.js";
import { SendResponse } from "./response.js";

const responseError = SendResponse.error;

export const ErrorCode = {
	BAD_REQUEST: "BAD_REQUEST",
	VALIDATION_ERROR: "VALIDATION_ERROR",
	UNAUTHORIZED: "UNAUTHORIZED",
	FORBIDDEN: "FORBIDDEN",
	NOT_FOUND: "NOT_FOUND",
	CONFLICT: "CONFLICT",
	INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

export class AppError extends Error {
	readonly code: ErrorCodeType;
	readonly status: TStatusCode;
	readonly details?: Record<string, string>;

	constructor(
		code: ErrorCodeType,
		message: string,
		status: TStatusCode,
		details?: Record<string, string>,
	) {
		super(message);
		this.name = "AppError";
		this.code = code;
		this.status = status;
		if (details) {
			this.details = details;
		}
	}

	toResponse() {
		return responseError(this.code, this.message, this.status, this.details);
	}
}

export class ValidationError extends AppError {
	constructor(message: string, details?: Record<string, string>) {
		super(ErrorCode.VALIDATION_ERROR, message, 400, details);
		this.name = "ValidationError";
	}
}

export class BadRequestError extends AppError {
	constructor(message: string, details?: Record<string, string>) {
		super(ErrorCode.BAD_REQUEST, message, 400, details);
		this.name = "BadRequestError";
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(ErrorCode.UNAUTHORIZED, message, 401);
		this.name = "UnauthorizedError";
	}
}

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(ErrorCode.FORBIDDEN, message, 403);
		this.name = "ForbiddenError";
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(ErrorCode.NOT_FOUND, message, 404);
		this.name = "NotFoundError";
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(ErrorCode.CONFLICT, message, 409);
		this.name = "ConflictError";
	}
}

export class InternalError extends AppError {
	constructor(message = "Internal server error") {
		super(ErrorCode.INTERNAL_ERROR, message, 500);
		this.name = "InternalError";
	}
}
