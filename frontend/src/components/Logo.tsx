import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

export default function Logo() {
  return (
    <Group gap="sm" style={{ textDecoration: "none" }}>
      <ThemeIcon
        size="lg"
        radius="md"
        variant="gradient"
        gradient={{ from: "red", to: "palevioletred" }}
      >
        <IconSparkles size={20} />
      </ThemeIcon>
      <Stack gap={0}>
        <Title
          order={4}
          fw={900}
          variant="gradient"
          style={{ fontFamily: "monospace", color: "palevioletred" }}
        >
          Code Call
        </Title>
        <Text size="xs" c="dimmed" mt={-2}>
          Code Together
        </Text>
      </Stack>
    </Group>
  );
}
