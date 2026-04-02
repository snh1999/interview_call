import express from "express";
import { validateBody, validateParams } from "#lib/http-wrapper/request";
import { verifyToken } from "#middlewares/verify-token";
import { SessionController } from "./session.controller.js";
import { createSessionSchema, sessionParamsSchema } from "./session.dto.js";

const router = express.Router();

router.post(
	"/",
	verifyToken,
	validateBody(createSessionSchema),
	SessionController.createSession,
);
router.get("/chat", verifyToken, SessionController.getStreamToken);

router.get("/active", verifyToken, SessionController.getActiveSessions);
router.get("/scheduled", verifyToken, SessionController.getScheduledSessions);
router.get("/recent", verifyToken, SessionController.getRecentSessions);
router.get(
	"/:id",
	verifyToken,
	validateParams(sessionParamsSchema),
	SessionController.getSessionById,
);
router.post(
	"/:id/join",
	verifyToken,
	validateParams(sessionParamsSchema),
	SessionController.joinSession,
);
router.post(
	"/:id/end",
	verifyToken,
	validateParams(sessionParamsSchema),
	SessionController.endSession,
);

export { router as sessionRouter };
