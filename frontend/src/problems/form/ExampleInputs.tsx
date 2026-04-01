import {
	ActionIcon,
	Box,
	Button,
	Group,
	Paper,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import type { TProblemForm } from "./problem.helper";

interface Props {
	form: UseFormReturnType<TProblemForm>;
}

export function ExampleInputs({ form }: Props) {
	const addExample = () =>
		form.insertListItem("examples", {
			id: crypto.randomUUID(),
			input: "",
			output: "",
			explanation: "",
		});
	const removeExample = (index: number) =>
		form.removeListItem("examples", index);

	return (
		<Box>
			<Text component="label" fw={500} size="sm">
				Examples
			</Text>
			<Stack gap="xs">
				{form.values.examples.map((example, index) => (
					<Paper key={example.id} shadow="xs" p="xs" withBorder={false}>
						<Group justify="flex-end" mb="xs">
							<ActionIcon
								color="red"
								variant="light"
								onClick={() => removeExample(index)}
								disabled={form.values.examples.length === 1}
								aria-label={`Remove example ${index + 1}`}
							>
								<IconTrash size={16} />
							</ActionIcon>
						</Group>
						<Stack gap="xs">
							<TextInput
								label={`Example ${index + 1} Input`}
								placeholder='s = ["h","e","l","l","o"]'
								{...form.getInputProps(`examples.${index}.input`)}
							/>
							<TextInput
								label={`Example ${index + 1} Output`}
								placeholder='["o","l","l","e","h"]'
								{...form.getInputProps(`examples.${index}.output`)}
							/>
							<TextInput
								label={`Example ${index + 1} Explanation (optional)`}
								placeholder="Explanation of the example..."
								{...form.getInputProps(`examples.${index}.explanation`)}
							/>
						</Stack>
					</Paper>
				))}
				<Button
					variant="light"
					size="xs"
					onClick={addExample}
					leftSection={<IconPlus size={14} />}
				>
					Add Example
				</Button>
			</Stack>
		</Box>
	);
}
