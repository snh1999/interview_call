import {
  Box,
  Card,
  Flex,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import type { ISession } from "../store/api/api.types";
import ActiveSessionCard from "./ActiveSessionCard";

interface ActiveSessionsProps {
  sessions: ISession[];
  isLoading: boolean;
}

function ActiveSessions({ sessions, isLoading }: ActiveSessionsProps) {
  return (
    <Card
      withBorder
      h="auto"
      style={{ borderColor: "var(--mantine-color-blue-3)" }}
    >
      <Stack>
        <Flex justify="space-between" align="center" mb="md">
          <Group>
            <ThemeIcon
              size="xl"
              radius="md"
              variant="gradient"
              gradient={{ from: "red", to: "violet" }}
            >
              <IconSparkles size={20} />
            </ThemeIcon>
            <Title order={2} size="h3">
              Live Sessions
            </Title>
          </Group>
          <Group gap="xs">
            <Box
              w={8}
              h={8}
              style={{
                backgroundColor: "var(--mantine-color-green-6)",
                borderRadius: "50%",
              }}
            />
            <Text size="sm" c="green" fw={500}>
              {sessions.length} active
            </Text>
          </Group>
        </Flex>

        <ScrollArea h={190}>
          <Stack gap="sm">
            {isLoading ? (
              <Flex justify="center" align="center" h={200}>
                <Loader />
              </Flex>
            ) : sessions.length > 0 ? (
              sessions.map((session) => (
                <ActiveSessionCard key={session._id} session={session} />
              ))
            ) : (
              <Flex direction="column" align="center" py="xs">
                <Paper
                  w={80}
                  h={80}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--mantine-color-blue-2), var(--mantine-color-violet-2))",
                    borderRadius: "var(--mantine-radius-xl)",
                  }}
                >
                  <Flex h="100%" align="center" justify="center">
                    <IconSparkles
                      size={40}
                      color="var(--mantine-color-blue-5)"
                    />
                  </Flex>
                </Paper>
                <Text fw={600} size="lg" mt="md">
                  No active sessions
                </Text>
                <Text size="sm" c="dimmed">
                  Be the first to create one!
                </Text>
              </Flex>
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
}

export default ActiveSessions;
