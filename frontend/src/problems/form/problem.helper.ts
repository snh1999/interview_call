import { useForm } from "@mantine/form";
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
    })
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

const stringToObjectArray = (data?: string[]) =>
  data?.map((value) => ({ id: crypto.randomUUID(), value })) ?? [
    { id: crypto.randomUUID(), value: "" },
  ];

const objectToObjectArray = <T extends object>(data?: T[]) =>
  data?.map((value) => ({ ...value, id: crypto.randomUUID() }));

export function useProblemForm(
  initialValues?: Partial<TProblem>,
  onSuccess?: () => void,
  isCreate?: boolean
) {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: initialValues?.title ?? "",
      difficulty: initialValues?.difficulty ?? ("easy" as const),
      categories: stringToObjectArray(initialValues?.categories),
      description: initialValues?.description ?? {
        text: "",
        notes: [],
        // notes: [{ id: crypto.randomUUID(), value: "" }],
      },
      examples: objectToObjectArray(initialValues?.examples) ?? [
        { id: crypto.randomUUID(), input: "", output: "", explanation: "" },
      ],
      constraints: stringToObjectArray(initialValues?.constraints),
      languages: objectToObjectArray(initialValues?.languages) ?? [
        {
          id: crypto.randomUUID(),
          name: "",
          starterCode: "",
          expectedOutput: "",
        },
      ],
      slug: initialValues?.slug ?? "",
    },
    validate: zod4Resolver(problemSchema),
  });

  const [createProblem, { isLoading: isCreating }] = useCreateProblemMutation();
  const [updateProblem, { isLoading: isUpdating }] = useUpdateProblemMutation();

  const onSubmit = async (values: TProblemForm) => {
    const data = {
      ...values,
      categories: values.categories.map(({ value }) => value),
      constraints: values.constraints.map(({ value }) => value),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      examples: values.examples.map(({ id: _, ...rest }) => rest),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      languages: values.languages.map(({ id: _, ...rest }) => rest),
    };

    try {
      if (initialValues && !isCreate) {
        await updateProblem({ id: initialValues._id, ...data }).unwrap();
      } else {
        await createProblem(data).unwrap();
        navigate("/problems");
      }
      toast.success("Problem updated successfully");
      if (onSuccess) {
        onSuccess();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.error?.message || "Failed to update problem");
    }
  };

  return {
    form,
    isLoading: isCreating || isUpdating,
    onSubmit,
  };
}
