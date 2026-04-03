import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import {
  useCreateSessionMutation,
  useUpdateSessionMutation,
} from "../store/api/session";

const sessionSchema = z.object({
  problem: z.string().min(1, "Problem is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  email: z.email("Invalid email").optional(),
});

export type TCreateSession = z.infer<typeof sessionSchema>;
export type TUpdateSession = { id: string } & Partial<TCreateSession>;

export function useSessionForm(initialValues?: Partial<TCreateSession>) {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      problem: initialValues?.problem ?? "",
      difficulty: initialValues?.difficulty ?? ("easy" as const),
      email: initialValues?.email ?? "",
    },
    validate: zod4Resolver(sessionSchema),
  });

  const [createSession, { isLoading: isCreating }] = useCreateSessionMutation();
  const [updateSession, { isLoading: isUpdating }] = useUpdateSessionMutation();

  const handleCreate = async (values: TCreateSession) => {
    try {
      await createSession({
        problem: values.problem,
        difficulty: values.difficulty,
        email: values.email || undefined,
      }).unwrap();
      toast.success("Session created successfully");
      return;
      navigate(`/session/${result.session._id}`);
    } catch (error: unknown) {
      const err = error as { data?: { error?: { message?: string } } };
      toast.error(err.data?.error?.message || "Failed to create session");
    }
  };

  const handleUpdate = async (id: string, values: TCreateSession) => {
    try {
      await updateSession({
        id,
        problem: values.problem || undefined,
        difficulty: values.difficulty || undefined,
        email: values.email || undefined,
      }).unwrap();
      toast.success("Session updated successfully");
    } catch (error: unknown) {
      const err = error as { data?: { error?: { message?: string } } };
      toast.error(err.data?.error?.message || "Failed to update session");
    }
  };

  return {
    form,
    handleCreate,
    handleUpdate,
    isLoading: isCreating || isUpdating,
    isCreating,
    isUpdating,
  };
}
