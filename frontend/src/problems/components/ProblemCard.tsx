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
import type { TProblem } from "../form/problem.helper";
import { getDifficultyColor } from "../problems.utils";

export default function ProblemCard({ problem }: { problem: TProblem }) {
	return (
		<Paper
			key={problem._id}
			component={Link}
			to={`/problem/${problem.slug}`}
			withBorder
			p="lg"
			radius="md"
			style={{ textDecoration: "none" }}
		>
			<Flex justify="space-between" align="center" gap="md">
				<Box style={{ flex: 1 }}>
					<Group mb="xs">
						<ThemeIcon size="xl" radius="md" variant="light" color="pink">
							<IconCode size={24} />
						</ThemeIcon>
						<Box>
							<Group gap="xs" mb={4}>
								<Title style={{ color: "palevioletred" }} order={4}>
									{problem.title}
								</Title>
								<Badge color={getDifficultyColor(problem.difficulty)}>
									{problem.difficulty}
								</Badge>
							</Group>
							{problem.categories.map((c) => (
								<Badge
									style={{ marginRight: 5 }}
									key={c}
									variant="light"
									color="gray"
									size="xs"
								>
									{c}
								</Badge>
							))}
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
