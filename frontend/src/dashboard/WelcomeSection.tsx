import {
	Box,
	Button,
	Container,
	Flex,
	Paper,
	Text,
	Title,
} from "@mantine/core";
import {
	IconArrowRight,
	IconBrandZapier,
	IconSparkles,
} from "@tabler/icons-react";
import { useAppSelector } from "../store/store";

function WelcomeSection({ onCreateSession }: { onCreateSession: () => void }) {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<Box pos="relative" style={{ overflow: "hidden" }}>
			<Container size="xl" px="xl" py="xl">
				<Flex justify="space-between" align="center" wrap="wrap" gap="md">
					<Box>
						<Flex align="center" gap="md" mb="xs">
							<Paper
								w={48}
								h={48}
								style={{
									background:
										"linear-gradient(135deg, var(--mantine-color-pink-6), var(--mantine-color-violet-6))",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<IconSparkles size={24} color="white" />
							</Paper>
							<Title
								order={1}
								size="h1"
								style={{
									background:
										"linear-gradient(90deg, var(--mantine-color-pink-6), var(--mantine-color-violet-6), var(--mantine-color-blue-6))",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							>
								Welcome back, {user?.firstName || "there"}!
							</Title>
						</Flex>
						<Text size="xl" c="dimmed" ml={64}>
							Ready to level up your coding skills?
						</Text>
					</Box>
					<Button
						onClick={onCreateSession}
						size="lg"
						radius="md"
						style={{
							background:
								"linear-gradient(90deg, var(--mantine-color-pink-6), var(--mantine-color-violet-6))",
						}}
						rightSection={<IconArrowRight size={20} />}
						leftSection={<IconBrandZapier size={20} />}
					>
						Create Session
					</Button>
				</Flex>
			</Container>
		</Box>
	);
}

export default WelcomeSection;
