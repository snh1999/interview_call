import { model, Schema } from "mongoose";

export const SessionDifficultyEnum = ["easy", "medium", "hard"];
export const SessionStatusEnum = ["scheduled", "active", "completed"];
// TODO: remove difficulty field
const sessionSchema = new Schema(
  {
    problem: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    difficulty: {
      type: String,
      enum: SessionDifficultyEnum,
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: SessionStatusEnum,
      default: "scheduled",
    },
    callId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Session = model("Session", sessionSchema);
