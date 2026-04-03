import {
	ActionIcon,
	Box,
	Button,
	Group,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import type { useProblemForm } from "./problem.helper";

interface Props {
	form: ReturnType<typeof useProblemForm>["form"];
}

export function ConstraintInputs({ form }: Props) {
	const addConstraint = () =>
		form.insertListItem("constraints", { id: crypto.randomUUID(), value: "" });
	const removeConstraint = (index: number) =>
		form.removeListItem("constraints", index);

	return (
		<Box>
			<Text component="label" fw={500} size="sm">
				Constraints
			</Text>
			<Stack gap="xs">
				{form.values.constraints.map((constraint, index) => (
					<Group key={constraint.id} gap="xs">
						<TextInput
							placeholder="1 ≤ s.length ≤ 10⁵"
							aria-label={`Constraint ${index + 1}`}
							{...form.getInputProps(`constraints.${index}.value`)}
							style={{ flex: 1 }}
						/>
						<ActionIcon
							color="red"
							variant="light"
							onClick={() => removeConstraint(index)}
							disabled={form.values.constraints.length === 1}
							aria-label={`Remove constraint ${index + 1}`}
						>
							<IconTrash size={16} />
						</ActionIcon>
					</Group>
				))}

				<Button
					variant="light"
					size="xs"
					onClick={addConstraint}
					leftSection={<IconPlus size={14} />}
				>
					Add Constraint
				</Button>
			</Stack>
		</Box>
	);
}
