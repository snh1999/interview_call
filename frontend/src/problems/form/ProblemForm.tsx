import {
	Button,
	Container,
	Divider,
	Paper,
	Select,
	Stack,
	Textarea,
	TextInput,
} from "@mantine/core";

import { CategoryInputs } from "./CategoryInputs";
import { ConstraintInputs } from "./ConstraintInputs";
import { ExampleInputs } from "./ExampleInputs";
import { LanguageInputs } from "./LanguageInputs";
import { useProblemForm } from "./problem.helper";

export default function ProblemForm() {
	const { form, handleCreate, isLoading } = useProblemForm();

	return (
		<Container size="lg">
			<Paper withBorder shadow="sm" p="xl">
				<form onSubmit={form.onSubmit((values) => handleCreate(values))}>
					<Stack gap="lg">
						<TextInput
							label="Title"
							placeholder="Two Sum"
							{...form.getInputProps("title")}
						/>

						<TextInput
							label="Custom Slug (optional)"
							placeholder="leave empty for auto-generated"
							{...form.getInputProps("slug")}
						/>

						<Select
							label="Difficulty"
							data={[
								{ value: "easy", label: "Easy" },
								{ value: "medium", label: "Medium" },
								{ value: "hard", label: "Hard" },
							]}
							{...form.getInputProps("difficulty")}
						/>

						<CategoryInputs form={form} />

						<Textarea
							label="Description"
							placeholder="Problem description..."
							minRows={4}
							{...form.getInputProps("description.text")}
						/>

						<ExampleInputs form={form} />

						<ConstraintInputs form={form} />

						<Divider />

						<LanguageInputs form={form} />

						<Button type="submit" loading={isLoading} size="lg">
							Create Problem
						</Button>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
