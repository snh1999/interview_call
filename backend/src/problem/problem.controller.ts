import { createController } from "#lib/http-wrapper/request";
import { SendResponse } from "#lib/http-wrapper/response";
import { Types } from "mongoose";
import { Problem } from "./Problem.model.js";
import type {
  TCreateProblemDTO,
  TProblemParams,
  TUpdateProblemDTO,
} from "./problem.dto.js";

const createProblem = createController(async (req) => {
  const data = req.body as TCreateProblemDTO;
  const creator = req.user._id;

  if (data.slug) {
    const existing = await Problem.findOne({ slug: data.slug });
    if (existing) {
      return SendResponse.error(
        "BAD_REQUEST",
        "Problem with this slug already exists",
        400
      );
    }
  }

  const problem = await Problem.create({ ...data, creator });
  return SendResponse.created({ problem }, "Problem created successfully");
});

const getAllProblems = createController(async () => {
  const problems = await Problem.find()
    .select("-languages.starterCode -languages.expectedOutput")
    .sort({ createdAt: -1 });
  return SendResponse.ok({ problems });
});

const getProblemById = createController(async (req) => {
  const { id } = req.params as TProblemParams;
  let problem = await Problem.findOne({
    slug: id,
  });
  if (!problem) {
    problem = await Problem.findById(id);
  }

  if (!problem) {
    return SendResponse.error("NOT_FOUND", "Problem not found", 404);
  }

  return SendResponse.ok({ problem });
});

const updateProblem = createController(async (req) => {
  const { id } = req.params as TProblemParams;
  const data = req.body as TUpdateProblemDTO;

  const problem = await Problem.findOneAndUpdate(
    { $or: [{ slug: id }, { _id: Types.ObjectId.createFromHexString(id) }] },
    data,
    { new: true }
  );

  if (!problem) {
    return SendResponse.error("NOT_FOUND", "Problem not found", 404);
  }

  return SendResponse.ok({ problem }, "Problem updated successfully");
});

const deleteProblem = createController(async (req) => {
  const { id } = req.params as TProblemParams;

  const problem = await Problem.findOneAndDelete({
    $or: [{ slug: id }, { _id: Types.ObjectId.createFromHexString(id) }],
  });

  if (!problem) {
    return SendResponse.error("NOT_FOUND", "Problem not found", 404);
  }

  return SendResponse.ok({ problem }, "Problem deleted successfully");
});

export const ProblemController = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};
