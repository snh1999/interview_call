import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { validate } from "./validation.js";

export type TypedRequest<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
> = Request<TParams, unknown, TBody, TQuery>;

export type RequestHandler<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
> = (
  req: TypedRequest<TBody, TQuery, TParams>,
  res: Response,
  next: NextFunction
) => unknown;

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = validate(schema, req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    (req as TypedRequest<T>).body = result.data;
    next();
  };
}

export function validateQuery<T>(schema: z.ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = validate(schema, req.query);

    if (!result.success) {
      next(result.error);
      return;
    }

    (req as TypedRequest<unknown, T>).query = result.data;
    next();
  };
}

export function validateParams<T>(schema: z.ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = validate(schema, req.params);

    if (!result.success) {
      next(result.error);
      return;
    }

    (req as TypedRequest<unknown, unknown, T>).params = result.data;
    next();
  };
}

export function asyncHandler<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
>(fn: RequestHandler<TBody, TQuery, TParams>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(
      fn(req as TypedRequest<TBody, TQuery, TParams>, res, next)
    ).catch(next);
  };
}

export type Controller<TBody, TQuery, TParams> = (
  req: TypedRequest<TBody, TQuery, TParams>,
  res: Response
) => unknown;

export function createController<TBody, TQuery, TParams>(
  handler: Controller<TBody, TQuery, TParams>
): RequestHandler<TBody, TQuery, TParams> {
  return (req, res, next) => {
    Promise.resolve(handler(req as TypedRequest<TBody, TQuery, TParams>, res))
      .then((result) => {
        if (result && typeof result === "object" && "status" in result) {
          const r = result as { status: number };
          res.status(r.status).json(result);
        }
      })
      .catch(next);
  };
}
