import {
	Badge,
	Box,
	Flex,
	Group,
	Paper,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconChevronRight, IconCode } from "@tabler/icons-react";
import { Link } from "react-router";

export interface Problem {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	description: { text: string };
}

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "Easy":
		case "easy":
			return "green";
		case "Medium":
		case "medium":
			return "yellow";
		case "Hard":
		case "hard":
			return "red";
		default:
			return "gray";
	}
};

export default function ProblemCard({ problem }: { problem: Problem }) {
	return (
		<Paper
			key={problem.id}
			component={Link}
			to={`/problem/${problem.id}`}
			withBorder
			p="lg"
			radius="md"
			style={{ textDecoration: "none" }}
		>
			<Flex justify="space-between" align="center" gap="md">
				<Box style={{ flex: 1 }}>
					<Group mb="xs">
						<ThemeIcon size="xl" radius="md" variant="light" color="blue">
							<IconCode size={24} />
						</ThemeIcon>
						<Box>
							<Group gap="xs" mb={4}>
								<Title order={4}>{problem.title}</Title>
								<Badge color={getDifficultyColor(problem.difficulty)}>
									{problem.difficulty}
								</Badge>
							</Group>
							<Text size="sm" c="dimmed">
								{problem.category}
							</Text>
						</Box>
					</Group>
					<Text c="dimmed">{problem.description.text}</Text>
				</Box>

				<Group gap="xs" c="blue" style={{ flexShrink: 0 }}>
					<Text fw={500}>Solve</Text>
					<IconChevronRight size={20} />
				</Group>
			</Flex>
		</Paper>
	);
}
