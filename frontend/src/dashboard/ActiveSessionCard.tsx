import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconArrowRight,
  IconCrown,
  IconFileCode2,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { getDifficultyColor } from "../problems/problems.utils";
import type { ISession } from "../store/api/api.types";
import { useAppSelector } from "../store/store";

interface Prop {
  session: ISession;
}

export default function ActiveSessionCard({ session }: Prop) {
  const { user } = useAppSelector((state) => state.auth);

  const isUserInSession = (session: ISession) => {
    if (!user?.id) return false;
    return session.host._id === user.id || session.participant?._id === user.id;
  };

  return (
    <Card
      key={session._id}
      withBorder
      shadow="none"
      style={{ borderColor: "var(--mantine-color-gray-3)" }}
    >
      <Flex justify="space-between" align="center" gap="md">
        <Group flex={1}>
          <Paper
            w={56}
            h={56}
            shadow="none"
            style={{
              background:
                "linear-gradient(135deg, var(--mantine-pink-blue-6), var(--mantine-color-violet-6))",
              borderRadius: "var(--mantine-radius-md)",
              position: "relative",
            }}
          >
            <Flex h="100%" align="center" justify="center">
              <IconFileCode2 size={28} color="pink" />
            </Flex>
            <Box
              pos="absolute"
              top={-4}
              right={-4}
              w={16}
              h={16}
              style={{
                backgroundColor: "var(--mantine-color-green-6)",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          </Paper>

          <Box flex={1}>
            <Group gap="xs" mb={4}>
              <Text fw={700} size="lg" truncate>
                {session.problem}
              </Text>
              <Badge color={getDifficultyColor(session.difficulty)}>
                {session.difficulty.charAt(0).toUpperCase() +
                  session.difficulty.slice(1)}
              </Badge>
            </Group>
            <Group gap="md" c="dimmed">
              <Group gap={4}>
                <IconCrown size={16} />
                <Text size="sm">{session.host?.name}</Text>
              </Group>
              <Group gap={4}>
                <IconUsers size={16} />
                <Text size="sm">{session.participant ? "2/2" : "1/2"}</Text>
              </Group>
              {session.participant && !isUserInSession(session) ? (
                <Badge color="red">FULL</Badge>
              ) : (
                <Badge color="green">OPEN</Badge>
              )}
            </Group>
          </Box>
        </Group>

        {session.participant && !isUserInSession(session) ? (
          <Button disabled size="sm">
            Full
          </Button>
        ) : (
          <Button
            component={Link}
            to={`/session/${session._id}`}
            size="sm"
            rightSection={<IconArrowRight size={16} />}
          >
            {isUserInSession(session) ? "Rejoin" : "Join"}
          </Button>
        )}
      </Flex>
    </Card>
  );
}
