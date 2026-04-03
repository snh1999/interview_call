import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { IAuthPayload } from "#auth/auth.dto";
import { ENV } from "#lib/env";
import { SendResponse } from "#lib/http-wrapper/response";
import { User } from "#user/User.model";

export async function verifyToken(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return SendResponse.error("UNAUTHORIZED", "No Token Provided", 403);
  }

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as IAuthPayload;
    if (!payload) {
      return SendResponse.error("UNAUTHORIZED", "Invalid token", 403);
    }
    req.userId = payload.id;
    req.user = await User.findById(payload.id).select("-password");
    next();
  } catch {
    return SendResponse.error("UNAUTHORIZED", "Error validating token", 403);
  }
}
