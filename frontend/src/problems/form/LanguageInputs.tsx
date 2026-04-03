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
import { IconPlus, IconTrash } from "@tabler/icons-react";
import CodeInput from "./CodeInput";
import type { useProblemForm } from "./problem.helper";

interface Props {
  form: ReturnType<typeof useProblemForm>["form"];
}

export function LanguageInputs({ form }: Props) {
  const addLanguage = () =>
    form.insertListItem("languages", {
      id: crypto.randomUUID(),
      name: "",
      starterCode: "",
      expectedOutput: "",
    });

  const removeLanguage = (index: number) =>
    form.removeListItem("languages", index);

  return (
    <Box>
      <Text component="label" fw={500} size="sm">
        Languages
      </Text>
      <Stack gap="md">
        {form.values.languages.map((lang, index) => (
          <Paper key={lang.id} shadow="xs" p="xs" withBorder={false}>
            <Group justify="flex-end" mb="xs">
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => removeLanguage(index)}
                disabled={form.values.languages.length === 1}
                aria-label={`Remove language ${index + 1}`}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
            <Stack gap="xs">
              <TextInput
                label={`Language ${index + 1} Name`}
                placeholder="javascript, python, java..."
                {...form.getInputProps(`languages.${index}.name`)}
              />

              {lang.name && (
                <>
                  <CodeInput
                    languageName={lang.name}
                    label="Starter Code"
                    value={form.values.languages[index].starterCode}
                    error={form.errors[`languages.${index}.starterCode`]}
                    setValue={(value) =>
                      form.setFieldValue(
                        `languages.${index}.starterCode`,
                        value ?? ""
                      )
                    }
                  />
                  <CodeInput
                    languageName={lang.name}
                    label="Expected Output"
                    value={form.values.languages[index].expectedOutput}
                    error={form.errors[`languages.${index}.expectedOutput`]}
                    setValue={(value) =>
                      form.setFieldValue(
                        `languages.${index}.expectedOutput`,
                        value ?? ""
                      )
                    }
                  />
                </>
              )}
            </Stack>
          </Paper>
        ))}
        <Button
          variant="light"
          size="xs"
          onClick={addLanguage}
          leftSection={<IconPlus size={14} />}
        >
          Add Language
        </Button>
      </Stack>
    </Box>
  );
}
