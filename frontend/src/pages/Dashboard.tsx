import { Box, Container, Grid, Modal } from "@mantine/core";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ActiveSessions from "../dashboard/ActiveSessions";
import RecentSessions from "../dashboard/RecentSessions";
import StatsCards from "../dashboard/StatsCard";
import WelcomeSection from "../dashboard/WelcomeSection";
import { SessionForm } from "../session/SessionForm";
import { useSessionForm } from "../session/session.helper";
import {
	useGetActiveSessionsQuery,
	useGetRecentSessionsQuery,
} from "../store/api/session";

function DashboardPage() {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { form, handleCreate, isLoading } = useSessionForm();

	const { data: activeSessionsData, isLoading: loadingActiveSessions } =
		useGetActiveSessionsQuery();
	const { data: recentSessionsData, isLoading: loadingRecentSessions } =
		useGetRecentSessionsQuery();

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
				onClose={() => {
					setShowCreateModal(false);
					form.reset();
				}}
				title="Create New Session"
				centered
				size="md"
			>
				<SessionForm
					form={form}
					handleCreate={handleCreate}
					isLoading={isLoading}
				/>
			</Modal>
		</Box>
	);
}

export default DashboardPage;
