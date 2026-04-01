import { Box, Flex } from "@mantine/core";

import { Panel, PanelGroup } from "react-resizable-panels";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { ResizeHandle } from "../components/ResizeHandle";

import { CodeEditorPanel } from "../problems/components/CodeEditor";
import { OutputPanel } from "../problems/components/OutputPanel";
import { ProblemDescription } from "../problems/components/ProblemDescription";

import { useGetProblemByIdQuery } from "../store/api/problems";

export default function ProblemPage() {
	const { id } = useParams();

	const { data } = useGetProblemByIdQuery(id, {
		skip: !id,
	});

	const currentProblem = data?.problem;

	if (!currentProblem) return;

	return (
		<Flex direction="column" h="100vh" bg="gray.0">
			<Navbar />
			<Box flex={1}>
				<PanelGroup direction="horizontal">
					<Panel defaultSize={40} minSize={30}>
						<ProblemDescription problem={currentProblem} />
					</Panel>

					<ResizeHandle direction="horizontal" />

					<Panel defaultSize={60} minSize={30}>
						<PanelGroup direction="vertical">
							<Panel defaultSize={70} minSize={30}>
								<CodeEditorPanel selectedProblem={currentProblem} />
							</Panel>

							<ResizeHandle direction="vertical" />

							<Panel defaultSize={30} minSize={30}>
								<OutputPanel />
							</Panel>
						</PanelGroup>
					</Panel>
				</PanelGroup>
			</Box>
		</Flex>
	);
}
