export type StatusCode =
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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: StatusCode;
  success: true;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  status: StatusCode;
  success: false;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export function ok<T>(data: T, message?: string): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    status: 200,
  };
  if (message) {
    response.message = message;
  }
  return response;
}

export function created<T>(
  data: T,
  message = "Resource created"
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    status: 201,
  };
  return response;
}

export function noContent(): ApiResponse<null> {
  return {
    success: true,
    data: null,
    status: 204,
  };
}

export function error(
  code: string,
  message: string,
  status: StatusCode,
  details?: Record<string, string>
): ApiError {
  const response: ApiError = {
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
  limit: number
): ApiResponse<PaginatedResult<T>> {
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
