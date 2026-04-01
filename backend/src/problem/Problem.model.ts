import { model, Schema } from "mongoose";

const problemDescriptionSchema = new Schema(
	{
		text: { type: String, required: true },
		notes: [{ type: String }],
	},
	{ _id: false },
);

const problemExampleSchema = new Schema(
	{
		input: { type: String, required: true },
		output: { type: String, required: true },
		explanation: { type: String },
	},
	{ _id: false },
);

const languageDataSchema = new Schema(
	{
		name: { type: String, required: true },
		starterCode: { type: String, required: true },
		expectedOutput: { type: String, required: true },
	},
	{ _id: false },
);

const problemSchema = new Schema(
	{
		title: { type: String, required: true },
		difficulty: {
			type: String,
			enum: ["easy", "medium", "hard"],
			required: true,
		},
		categories: [{ type: String }],
		description: { type: problemDescriptionSchema, required: true },
		examples: { type: [problemExampleSchema], required: true },
		constraints: [{ type: String }],
		languages: { type: [languageDataSchema], required: true },
		slug: { type: String, unique: true, sparse: true, index: true },
	},
	{ timestamps: true },
);

problemSchema.pre("save", function () {
	if (!this.slug) {
		this.slug = this._id.toString();
	}
});

problemSchema.index({ categories: 1 });
problemSchema.index({ difficulty: 1, categories: 1 });
problemSchema.index({ slug: 1 });

export const Problem = model("Problem", problemSchema);
