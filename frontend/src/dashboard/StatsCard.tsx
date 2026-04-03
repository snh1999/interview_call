import { Badge, Box, Flex, Paper, Text } from "@mantine/core";
import { IconTrophy, IconUsers } from "@tabler/icons-react";

interface StatsCardsProps {
  activeSessionsCount: number;
  recentSessionsCount: number;
}

function StatsCards({
  activeSessionsCount,
  recentSessionsCount,
}: StatsCardsProps) {
  return (
    <Flex direction="column" gap="md">
      <Paper
        withBorder
        p="lg"
        radius="md"
        style={{ borderColor: "var(--mantine-color-blue-3)" }}
      >
        <Flex justify="space-between" align="center" mb="xs">
          <Box
            p="sm"
            style={{
              backgroundColor: "var(--mantine-color-blue-0)",
              borderRadius: "var(--mantine-radius-lg)",
            }}
          >
            <IconUsers size={28} color="var(--mantine-color-blue-6)" />
          </Box>
          <Badge color="pink">Live</Badge>
        </Flex>
        <Text size="h2" fw={900}>
          {activeSessionsCount}
        </Text>
        <Text size="sm" c="dimmed">
          Active Sessions
        </Text>
      </Paper>

      <Paper
        withBorder
        p="lg"
        radius="md"
        style={{ borderColor: "var(--mantine-color-violet-3)" }}
      >
        <Flex justify="space-between" align="center" mb="xs">
          <Box
            p="sm"
            style={{
              backgroundColor: "var(--mantine-color-violet-0)",
              borderRadius: "var(--mantine-radius-lg)",
            }}
          >
            <IconTrophy size={28} color="var(--mantine-color-violet-6)" />
          </Box>
        </Flex>
        <Text size="h2" fw={900}>
          {recentSessionsCount}
        </Text>
        <Text size="sm" c="dimmed">
          Total Sessions
        </Text>
      </Paper>
    </Flex>
  );
}

export default StatsCards;
