import "express";
import type { IUserDocument } from "#user/User.model";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user: IUserDocument;
    }
  }
}
