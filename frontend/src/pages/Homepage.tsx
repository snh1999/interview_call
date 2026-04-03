import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconCheck,
  IconCode,
  IconPlayerPlay,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";
import AuthTab from "../home/AuthTabs";
import Header from "../home/Header";
import { useAppSelector } from "../store/store";
import DashboardPage from "./Dashboard";

export default function HomePage() {
  const { user } = useAppSelector((state) => state.auth);
  if (user) return <DashboardPage />;
  return (
    <Box
      style={{
        background:
          "linear-gradient(to bottom right, var(--mantine-color-gray-0), var(--mantine-color-gray-1), var(--mantine-color-gray-2))",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container size="xl" py={40}>
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="xl">
              <Badge
                size="lg"
                variant="gradient"
                opacity={0.8}
                gradient={{ from: "red", to: "palevioletred" }}
                leftSection={<IconArrowRight size={14} />}
              >
                Real-time Collaboration
              </Badge>

              <Title
                order={1}
                fw={900}
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  lineHeight: 1.1,
                }}
              >
                <Text
                  span
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 45 }}
                  inherit
                >
                  Code Together,
                </Text>
                <br />
                <Text span inherit>
                  Learn Together
                </Text>
              </Title>

              <Text size="xl" c="dimmed" maw={500}>
                The platform for collaborative coding interviews and pair
                programming. Connect face-to-face, code in real-time, and ace
                your technical interviews.
              </Text>

              <Group gap="sm">
                <Badge
                  size="lg"
                  color="pink"
                  variant="light"
                  leftSection={<IconCheck size={14} />}
                >
                  Live Video Chat
                </Badge>
                <Badge
                  size="lg"
                  color="pink"
                  variant="light"
                  leftSection={<IconCheck size={14} />}
                >
                  Code Editor
                </Badge>
                <Badge
                  size="lg"
                  color="pink"
                  variant="light"
                  leftSection={<IconCheck size={14} />}
                >
                  Multi-Language
                </Badge>
              </Group>

              <Group gap="md" mt="md">
                <Button
                  size="lg"
                  variant="default"
                  leftSection={<IconPlayerPlay size={20} />}
                >
                  Watch Demo
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <AuthTab />
          </Grid.Col>
        </Grid>
      </Container>

      {/* FEATURES SECTION */}
      <Container size="xl" py={80}>
        <Stack gap="xs" ta="center" mb={50} maw={600} mx="auto">
          <Title order={2} size="h2" fw={800}>
            Everything You Need to{" "}
            <Text span c="blue" ff="monospace" inherit>
              Succeed
            </Text>
          </Title>
          <Text size="lg" c="dimmed">
            Powerful features designed to make your coding interviews seamless
            and productive
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Card shadow="xl" padding="xl" radius="md" withBorder>
            <Stack align="center" ta="center" gap="md">
              <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                <IconVideo size={32} />
              </ThemeIcon>
              <Title order={3} size="h4">
                HD Video Call
              </Title>
              <Text c="dimmed">
                Crystal clear video and audio for seamless communication during
                interviews
              </Text>
            </Stack>
          </Card>

          <Card shadow="xl" padding="xl" radius="md" withBorder>
            <Stack align="center" ta="center" gap="md">
              <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                <IconCode size={32} />
              </ThemeIcon>
              <Title order={3} size="h4">
                Live Code Editor
              </Title>
              <Text c="dimmed">
                Collaborate in real-time with syntax highlighting and multiple
                language support
              </Text>
            </Stack>
          </Card>

          <Card shadow="xl" padding="xl" radius="md" withBorder>
            <Stack align="center" ta="center" gap="md">
              <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                <IconUsers size={32} />
              </ThemeIcon>
              <Title order={3} size="h4">
                Easy Collaboration
              </Title>
              <Text c="dimmed">
                Share your screen, discuss solutions, and learn from each other
                in real-time
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
