import { Router } from "express";
import { validateBody } from "#lib/http-wrapper/request";
import { verifyToken } from "#middlewares/verify-token";
import { AuthController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.dto.js";

const router = Router();

// @desc Register a new user
// route POST /api/auth/register
// @access public
router.post("/register", validateBody(registerSchema), AuthController.register);
router.post("/login", validateBody(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);
// @desc Get logged in user using token
// route POST /api/auth/user
// @access protected
router.post("/user", verifyToken, AuthController.getUser);

export { router as authRouter };
