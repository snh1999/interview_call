import {
	Badge,
	Box,
	Card,
	Flex,
	Grid,
	Group,
	Loader,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import {
	IconClock,
	IconFileCode2,
	IconTrophy,
	IconUsers,
} from "@tabler/icons-react";
import {
	formatDistanceToNow,
	getDifficultyColor,
} from "../problems/problems.utils";
import type { ISession } from "../store/api/api.types";

interface RecentSessionsProps {
	sessions: ISession[];
	isLoading: boolean;
}

function RecentSessions({ sessions, isLoading }: RecentSessionsProps) {
	return (
		<Card
			withBorder
			mt="xl"
			style={{ borderColor: "var(--mantine-color-pink-3)" }}
		>
			<Stack>
				<Group mb="md">
					<Paper
						p="xs"
						style={{
							background:
								"linear-gradient(135deg, var(--mantine-color-pink-6), var(--mantine-color-violet-6))",
							borderRadius: "var(--mantine-radius-md)",
						}}
					>
						<IconClock size={20} color="white" />
					</Paper>
					<Title order={2} size="h3">
						Your Past Sessions
					</Title>
				</Group>

				<Grid>
					{isLoading ? (
						<Grid.Col span={12}>
							<Flex justify="center" align="center" h={200}>
								<Loader />
							</Flex>
						</Grid.Col>
					) : sessions.length > 0 ? (
						sessions.map((session) => (
							<Grid.Col key={session._id} span={{ base: 12, md: 6, lg: 4 }}>
								<Card
									withBorder
									style={{
										backgroundColor:
											session.status === "active"
												? "var(--mantine-color-green-0)"
												: undefined,
										borderColor:
											session.status === "active"
												? "var(--mantine-color-green-3)"
												: undefined,
									}}
								>
									{session.status === "active" && (
										<Badge
											color="green"
											pos="absolute"
											top={12}
											right={12}
											leftSection={
												<Box
													w={6}
													h={6}
													style={{
														backgroundColor: "white",
														borderRadius: "50%",
													}}
												/>
											}
										>
											ACTIVE
										</Badge>
									)}

									<Stack>
										<Flex gap="md">
											<Paper
												w={48}
												h={48}
												style={{
													background:
														session.status === "active"
															? "linear-gradient(135deg, var(--mantine-color-green-6), var(--mantine-color-green-4))"
															: "linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-violet-6))",
													borderRadius: "var(--mantine-radius-md)",
												}}
											>
												<Flex h="100%" align="center" justify="center">
													<IconFileCode2 size={24} color="white" />
												</Flex>
											</Paper>
											<Box flex={1}>
												<Text fw={700} truncate mb={4}>
													{session.problem}
												</Text>
												<Badge
													color={getDifficultyColor(session.difficulty)}
													size="sm"
												>
													{session.difficulty}
												</Badge>
											</Box>
										</Flex>

										<Stack gap={4} c="dimmed">
											<Group gap={4}>
												<IconClock size={16} />
												<Text size="sm">
													{formatDistanceToNow(new Date(session.createdAt), {
														addSuffix: true,
													})}
												</Text>
											</Group>
											<Group gap={4}>
												<IconUsers size={16} />
												<Text size="sm">
													{session.participant ? "2" : "1"} participant
													{session.participant ? "s" : ""}
												</Text>
											</Group>
										</Stack>

										<Flex
											justify="space-between"
											pt="sm"
											style={{
												borderTop: "1px solid var(--mantine-color-gray-3)",
											}}
										>
											<Text size="xs" fw={600} c="dimmed" tt="uppercase">
												Completed
											</Text>
											<Text size="xs" c="dimmed">
												{new Date(session.updatedAt).toLocaleDateString()}
											</Text>
										</Flex>
									</Stack>
								</Card>
							</Grid.Col>
						))
					) : (
						<Grid.Col span={12}>
							<Flex direction="column" align="center" py="xl">
								<Paper
									w={80}
									h={80}
									style={{
										background:
											"linear-gradient(135deg, var(--mantine-color-pink-2), var(--mantine-color-violet-2))",
										borderRadius: "var(--mantine-radius-xl)",
									}}
								>
									<Flex h="100%" align="center" justify="center">
										<IconTrophy size={40} color="var(--mantine-color-pink-5)" />
									</Flex>
								</Paper>
								<Text fw={600} size="lg" mt="md">
									No sessions yet
								</Text>
								<Text size="sm" c="dimmed">
									Start your coding journey today!
								</Text>
							</Flex>
						</Grid.Col>
					)}
				</Grid>
			</Stack>
		</Card>
	);
}

export default RecentSessions;
