import express from "express";
import { validateBody, validateParams } from "#lib/http-wrapper/request";
import { verifyToken } from "#middlewares/verify-token";
import { ProblemController } from "./problem.controller.js";
import {
	createProblemSchema,
	problemParamsSchema,
	updateProblemSchema,
} from "./problem.dto.js";

const router = express.Router();

router.post(
	"/",
	verifyToken,
	validateBody(createProblemSchema),
	ProblemController.createProblem,
);

router.get("/", ProblemController.getAllProblems);

router.get(
	"/:id",
	validateParams(problemParamsSchema),
	ProblemController.getProblemById,
);

router.patch(
	"/:id",
	verifyToken,
	validateParams(problemParamsSchema),
	validateBody(updateProblemSchema),
	ProblemController.updateProblem,
);

router.delete(
	"/:id",
	verifyToken,
	validateParams(problemParamsSchema),
	ProblemController.deleteProblem,
);

export { router as problemRouter };
