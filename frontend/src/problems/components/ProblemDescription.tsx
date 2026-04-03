import {
	Badge,
	Box,
	Button,
	Code,
	Flex,
	Group,
	Modal,
	Paper,
	ScrollArea,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import ConfirmationModal from "../../components/ConfirmationModal";
import ProblemSelect from "../../components/ProblemSelect";
import { useDeleteProblemMutation } from "../../store/api/problems";
import { useAppSelector } from "../../store/store";
import ProblemForm from "../form/ProblemForm";
import { type TProblem, useProblemForm } from "../form/problem.helper";

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "Easy":
			return "green";
		case "Medium":
			return "yellow";
		case "Hard":
			return "red";
		default:
			return "gray";
	}
};

interface Props {
	problem: TProblem;
}

export function ProblemDescription({ problem }: Props) {
	const { id: currentProblemId } = useParams();
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	const { form, onSubmit, isLoading } = useProblemForm(problem, ()=> setShowModal(false));

	const [deleteProblem] = useDeleteProblemMutation();

	const onDeleteConfirm = async () => {
		try {
			await deleteProblem(currentProblemId).unwrap();
			navigate("/problems");
		} catch {
			toast.error("Failed to delete problem:");
		}
	};

	return (
		<ScrollArea h="100%" bg="gray.1">
			<Paper p="xl" bg="gray.0" withBorder>
				<Group justify="space-between" align="flex-start" mb="xs">
					<Title order={2}>{problem.title}</Title>
					<Flex gap="xs">
						<Badge color={getDifficultyColor(problem.difficulty)} size="lg">
							{problem.difficulty}
						</Badge>
						{user.id === problem.creator && (
							<Button onClick={()=> setShowModal(true)} size="xs" variant="outline">
								Update
							</Button>
						)}
						{user.id === problem.creator && (
							<ConfirmationModal
								titleText="Are you sure you want to delete the problem?"
								onConfirm={onDeleteConfirm}
								buttonText="Delete"
							/>
						)}
					</Flex>
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
				<ProblemSelect
					value={currentProblemId}
					onChange={(val) => {
						if (!val) return;
						navigate(`/problem/${val}`);
					}}
				/>
			</Paper>

			<Stack p="xl" gap="xl">
				<Paper p="xl" radius="md" withBorder shadow="sm">
					<Title order={4} mb="md">
						Description
					</Title>
					<Stack gap="sm">
						<Text>{problem.description.text}</Text>
						{problem.description.notes.map((note) => (
							<Text key={crypto.randomUUID()}>{note}</Text>
						))}
					</Stack>
				</Paper>

				<Paper p="xl" radius="md" withBorder shadow="sm">
					<Title order={4} mb="lg">
						Examples
					</Title>
					<Stack gap="lg">
						{problem.examples.map((example, idx) => (
							<Box key={crypto.randomUUID()}>
								<Group gap="xs" mb="xs">
									<Badge size="sm" variant="light">
										{idx + 1}
									</Badge>
									<Text fw={600}>Example {idx + 1}</Text>
								</Group>
								<Paper bg="gray.1" p="md" radius="md">
									<Stack gap="xs">
										<Group gap="sm">
											<Text c="pink" fw={700} w={70}>
												Input:
											</Text>
											<Code>{example.input}</Code>
										</Group>
										<Group gap="sm">
											<Text c="red" fw={700} w={70}>
												Output:
											</Text>
											<Code>{example.output}</Code>
										</Group>
										{example.explanation && (
											<Box
												pt="xs"
												mt="xs"
												style={{
													borderTop: "1px solid var(--mantine-color-gray-4)",
												}}
											>
												<Text size="xs" c="dimmed">
													<Text span fw={600}>
														Explanation:
													</Text>{" "}
													{example.explanation}
												</Text>
											</Box>
										)}
									</Stack>
								</Paper>
							</Box>
						))}
					</Stack>
				</Paper>
				<Paper p="xl" radius="md" withBorder shadow="sm">
					<Title order={4} mb="md">
						Constraints
					</Title>
					<Stack gap="xs">
						{problem.constraints.map((constraint) => (
							<Group key={crypto.randomUUID()} gap="sm">
								<Text c="blue">•</Text>
								<Code>{constraint}</Code>
							</Group>
						))}
					</Stack>
				</Paper>
			</Stack>

			<Modal
				opened={showModal}
				onClose={() => {
					setShowModal(false);
					form.reset();
				}}
				title="Update New Session"
				centered
				size="xl"
			>
				<ProblemForm
					title=""
					form={form}
					onSubmit={onSubmit}
					isLoading={isLoading}
				/>
			</Modal>
		</ScrollArea>
	);
}
