import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import ProblemCard from "../problems/components/ProblemCard";
import { useGetAllProblemsQuery } from "../store/api/problems";

export default function ProblemsPage() {
  const { data } = useGetAllProblemsQuery();
  const navigate = useNavigate();

  const problems = data?.problems ?? [];

  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === "easy"
  ).length;
  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === "medium"
  ).length;
  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === "hard"
  ).length;

  const stats = [
    { label: "Total Problems", value: problems.length, color: "blue" },
    { label: "Easy", value: easyProblemsCount, color: "green" },
    { label: "Medium", value: mediumProblemsCount, color: "yellow" },
    { label: "Hard", value: hardProblemsCount, color: "red" },
  ];

  return (
    <Box bg="gray.0" style={{ minHeight: "100vh" }}>
      <Navbar />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Flex justify="space-between">
            <Box>
              <Title order={1} mb="xs">
                Practice Problems
              </Title>
              <Text c="dimmed" size="lg">
                Sharpen your coding skills with these curated problems
              </Text>
            </Box>
            <Button
              onClick={() => {
                navigate("/problems/create");
              }}
            >
              Create Problem
            </Button>
          </Flex>

          <Stack gap="md">
            {problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </Stack>

          <Card withBorder shadow="lg" p="xl">
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }}>
              {stats.map((stat) => (
                <Box key={stat.label} ta="center">
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>
                    {stat.label}
                  </Text>
                  <Title order={2} c={stat.color}>
                    {stat.value}
                  </Title>
                </Box>
              ))}
            </SimpleGrid>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
