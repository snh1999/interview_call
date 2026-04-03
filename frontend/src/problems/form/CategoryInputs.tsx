import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import type { useProblemForm } from "./problem.helper";

interface CategoryManagerProps {
  form: ReturnType<typeof useProblemForm>["form"];
}

export function CategoryInputs({ form }: CategoryManagerProps) {
  const addCategory = () =>
    form.insertListItem("categories", { id: crypto.randomUUID(), value: "" });
  const removeCategory = (index: number) =>
    form.removeListItem("categories", index);

  return (
    <Stack gap="xs">
      <Text component="label" fw={500} size="sm">
        Categories
      </Text>

      <Stack gap="xs">
        {form.values.categories.map((category, index) => (
          <Group key={category.id} gap="xs">
            <TextInput
              placeholder="e.g., Array, Two Pointers"
              aria-label={`Category ${index + 1}`}
              {...form.getInputProps(`categories.${index}.value`)}
              style={{ flex: 1 }}
            />
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => removeCategory(index)}
              disabled={form.values.categories.length === 1}
              aria-label={`Remove category ${index + 1}`}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        ))}

        <Button
          variant="light"
          size="xs"
          onClick={addCategory}
          leftSection={<IconPlus size={13} />}
        >
          Add Category
        </Button>
      </Stack>
    </Stack>
  );
}
