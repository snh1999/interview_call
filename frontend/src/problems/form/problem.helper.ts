import { type UseFormReturnType, useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import {
	useCreateProblemMutation,
	useUpdateProblemMutation,
} from "../../store/api/problems";

const languageDataSchema = z.object({
	name: z.string().min(1, "Language name is required"),
	starterCode: z.string().min(1, "Starter code is required"),
	expectedOutput: z.string().min(1, "Expected output is required"),
});

const problemSchema = z.object({
	title: z.string().min(1, "Title is required"),
	slug: z.string().min(1).nullable(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	description: z.object({
		text: z.string().min(1, "Description text is required"),
		notes: z.array(z.string()).default([]),
	}),
	examples: z.array(
		z.object({
			id: z.string(),
			input: z.string().min(1, "Input is required"),
			output: z.string().min(1, "Output is required"),
			explanation: z.string().optional(),
		}),
	),
	categories: z.array(z.object({ id: z.string(), value: z.string() })),
	constraints: z.array(z.object({ id: z.string(), value: z.string() })),
	languages: z.array(languageDataSchema.extend({ id: z.string() })),
});

export type TProblemForm = z.infer<typeof problemSchema>;

export type TProblem = Omit<TProblemForm, "categories" | "constraints"> & {
	categories: string[];
	constraints: string[];
	_id: string;
	creator: string;
};

export function useProblemForm(initialValues?: Partial<TProblemForm>) {
	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			title: "",
			difficulty: "easy" as const,
			categories: [{ id: crypto.randomUUID(), value: "" }],
			description: {
				text: "",
				notes: [],
				// notes: [{ id: crypto.randomUUID(), value: "" }],
			},
			examples: [
				{ id: crypto.randomUUID(), input: "", output: "", explanation: "" },
			],
			constraints: [{ id: crypto.randomUUID(), value: "" }],
			languages: [
				{
					id: crypto.randomUUID(),
					name: "",
					starterCode: "",
					expectedOutput: "",
				},
			],
			slug: "",
			...initialValues,
		},
		validate: zod4Resolver(problemSchema),
	});

	const [createProblem, { isLoading: isCreating }] = useCreateProblemMutation();
	const [updateProblem, { isLoading: isUpdating }] = useUpdateProblemMutation();

	const handleCreate = async (values: TProblemForm) => {
		try {
			await createProblem({
				...values,
				categories: values.categories.map(({ value }) => value),
				constraints: values.constraints.map(({ value }) => value),
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				examples: values.examples.map(({ id: _, ...rest }) => rest),
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				languages: values.languages.map(({ id: _, ...rest }) => rest),
			}).unwrap();
			toast.success("Problem created successfully");
			navigate("/problems");
		} catch (error: any) {
			toast.error(error.data?.error?.message || "Failed to create problem");
		}
	};

	const handleUpdate = async (id: string, values: TProblemForm) => {
		try {
			await updateProblem({ id, ...values }).unwrap();
			toast.success("Problem updated successfully");
		} catch (error: any) {
			toast.error(error.data?.error?.message || "Failed to update problem");
		}
	};

	return {
		form,
		handleCreate,
		handleUpdate,
		isLoading: isCreating || isUpdating,
	};
}
