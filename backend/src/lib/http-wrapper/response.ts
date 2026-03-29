import type { CookieOptions, Response } from "express";
import { ENV } from "#lib/env";

export type TStatusCode =
	| 200
	| 201
	| 204
	| 400
	| 401
	| 403
	| 404
	| 409
	| 422
	| 500;

export interface TApiResponse<T> {
	data: T;
	message?: string;
	status: TStatusCode;
	success: true;
}

export interface TApiError {
	error: {
		code: string;
		message: string;
		details?: Record<string, string>;
	};
	status: TStatusCode;
	success: false;
}

export type ApiResult<T> = TApiResponse<T> | TApiError;

function ok<T>(data: T, message?: string): TApiResponse<T> {
	const response: TApiResponse<T> = {
		success: true,
		data,
		status: 200,
	};
	if (message) {
		response.message = message;
	}
	return response;
}

function created<T>(data: T, message = "Resource created"): TApiResponse<T> {
	const response: TApiResponse<T> = {
		success: true,
		data,
		message,
		status: 201,
	};
	return response;
}

function noContent(): TApiResponse<null> {
	return {
		success: true,
		data: null,
		status: 204,
	};
}

function error(
	code: string,
	message: string,
	status: TStatusCode,
	details?: Record<string, string>,
): TApiError {
	const response: TApiError = {
		success: false,
		error: {
			code,
			message,
		},
		status,
	};
	if (details) {
		response.error.details = details;
	}
	return response;
}

export interface PaginatedResult<T> {
	items: T[];
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

export function paginated<T>(
	items: T[],
	total: number,
	page: number,
	limit: number,
): TApiResponse<PaginatedResult<T>> {
	return {
		success: true,
		data: {
			items,
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
		status: 200,
	};
}

export const defaultCookieOptions: CookieOptions = {
	httpOnly: true,
	sameSite: "strict",
	path: "/",
	secure: ENV.NODE_ENV === "production",
	maxAge:
		(Number.isNaN(ENV.JWT_MAX_AGE) ? 7 : ENV.JWT_MAX_AGE) * 24 * 60 * 60 * 1000,
};

function setCookie(
	res: Response,
	name: string,
	value: string,
	options?: Partial<CookieOptions>,
): void {
	const mergedOptions: CookieOptions = {
		...defaultCookieOptions,
		...options,
	};
	res.cookie(name, value, mergedOptions);
}

function clearCookie(
	res: Response,
	name: string,
	options?: Partial<CookieOptions>,
): void {
	const clearedOptions: CookieOptions = {
		...defaultCookieOptions,
		...options,
		expires: new Date(0),
		maxAge: 0,
	};
	res.clearCookie(name);
	res.cookie(name, "", clearedOptions);
}

export const SendResponse = {
	ok,
	created,
	noContent,
	error,
	setCookie,
	clearCookie,
};
