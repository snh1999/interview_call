import {
	Box,
	Button,
	Container,
	Grid,
	Modal,
	Select,
	Stack,
	TextInput,
} from "@mantine/core";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ProblemSelect from "../components/ProblemSelect";
import ActiveSessions from "../dashboard/ActiveSessions";
import RecentSessions from "../dashboard/RecentSessions";
import StatsCards from "../dashboard/StatsCard";
import WelcomeSection from "../dashboard/WelcomeSection";
import type { ISession, TDifficulty } from "../store/api/api.types";
import {
	useCreateSessionMutation,
	useGetActiveSessionsQuery,
	useGetRecentSessionsQuery,
} from "../store/api/session";

function DashboardPage() {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [roomConfig, setRoomConfig] = useState<{
		problem: string;
		difficulty: TDifficulty;
	}>({ problem: "", difficulty: "easy" });

	const [createSessionMutation, { isLoading: isCreateSessionLoading }] =
		useCreateSessionMutation();

	const { data: activeSessionsData, isLoading: loadingActiveSessions } =
		useGetActiveSessionsQuery();
	const { data: recentSessionsData, isLoading: loadingRecentSessions } =
		useGetRecentSessionsQuery();

	const handleCreateRoom = () => {
		if (!roomConfig.problem || !roomConfig.difficulty) return;

		createSessionMutation({
			problem: roomConfig.problem,
			difficulty: roomConfig.difficulty,
		});
	};

	const activeSessions = activeSessionsData?.sessions || [];
	const recentSessions = recentSessionsData?.sessions || [];

	return (
		<Box h="100vh">
			<Navbar />
			<WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

			<Container size="xl" px="xl">
				<Grid gutter="xl">
					<Grid.Col span={{ base: 12, lg: 4 }}>
						<StatsCards
							activeSessionsCount={activeSessions.length}
							recentSessionsCount={recentSessions.length}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, lg: 8 }}>
						<ActiveSessions
							sessions={activeSessions}
							isLoading={loadingActiveSessions}
						/>
					</Grid.Col>
				</Grid>

				<RecentSessions
					sessions={recentSessions}
					isLoading={loadingRecentSessions}
				/>
			</Container>

			<Modal
				opened={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				title="Create New Session"
				centered
				size="md"
			>
				<Stack mt="md">
					<ProblemSelect
						value={roomConfig.problem}
						onChange={(val) => {
							if (val) setRoomConfig({ ...roomConfig, problem: val });
						}}
					/>
					<Select
						label="Difficulty"
						placeholder="Select difficulty"
						value={roomConfig.difficulty}
						onChange={(val) =>
							setRoomConfig({ ...roomConfig, difficulty: val || "" })
						}
						data={[
							{ value: "easy", label: "Easy" },
							{ value: "medium", label: "Medium" },
							{ value: "hard", label: "Hard" },
						]}
						required
					/>
					<Button
						onClick={handleCreateRoom}
						loading={isCreateSessionLoading}
						disabled={!roomConfig.problem || !roomConfig.difficulty}
						fullWidth
						mt="sm"
					>
						Create Room
					</Button>
				</Stack>
			</Modal>
		</Box>
	);
}

export default DashboardPage;
