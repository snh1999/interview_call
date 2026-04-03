// https://youtu.be/R4AhvYORZRY&t=1558
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { AppError, InternalError } from "#lib/http-wrapper/error";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`[Error] ${err.name}: ${err.message}`);

  if (err instanceof AppError) {
    res.status(err.status).json(err.toResponse());
    return;
  }

  const internalError = new InternalError();
  res.status(internalError.status).json(internalError.toResponse());
};
