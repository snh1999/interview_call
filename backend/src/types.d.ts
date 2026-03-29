import "express";
import type { User } from "#user/User.model";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
			user: User;
		}
	}
}
