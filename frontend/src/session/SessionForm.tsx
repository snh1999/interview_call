import { Button, Select, Stack, TextInput } from "@mantine/core";
import ProblemSelect from "../components/ProblemSelect";
import type { useSessionForm } from "./session.helper";

interface SessionFormProps {
	form: ReturnType<typeof useSessionForm>["form"];
	handleCreate: ReturnType<typeof useSessionForm>["handleCreate"];
	handleUpdate?: ReturnType<typeof useSessionForm>["handleUpdate"];
	isLoading: boolean;
	isEdit?: boolean;
}

export function SessionForm({
	form,
	handleCreate,
	handleUpdate,
	isLoading,
	isEdit = false,
}: SessionFormProps) {
	return (
		<Stack mt="md">
			<ProblemSelect
				value={form.values.problem}
				onChange={(val) => form.setFieldValue("problem", val || "")}
			/>
			<Select
				label="Difficulty"
				placeholder="Select difficulty"
				{...form.getInputProps("difficulty")}
				data={[
					{ value: "easy", label: "Easy" },
					{ value: "medium", label: "Medium" },
					{ value: "hard", label: "Hard" },
				]}
				required
			/>
			<TextInput
				label="Invite by email (optional)"
				placeholder="participant@example.com"
				{...form.getInputProps("email")}
			/>
			<Button
				onClick={() => {
					if (isEdit && handleUpdate) {
						form.onSubmit((values) => {
							const sessionId = window.location.pathname.split("/").pop();
							if (sessionId) handleUpdate(sessionId, values);
						})();
					} else {
						form.onSubmit(handleCreate)();
					}
				}}
				loading={isLoading}
				disabled={!form.values.problem || !form.values.difficulty}
				fullWidth
				mt="sm"
			>
				{isEdit ? "Update Session" : "Create Session"}
			</Button>
		</Stack>
	);
}
