import { Box, Code, Flex, Stack, Text } from "@mantine/core";
import { useAppSelector } from "../../store/store";

export function OutputPanel() {
	const { output } = useAppSelector((state) => state.problem);
	return (
		<Flex direction="column" h="100%" bg="gray.0">
			<Box
				px="md"
				py="xs"
				bg="gray.1"
				style={{ borderBottom: "1px solid var(--mantine-color-gray-4)" }}
			>
				<Text fw={600} size="sm">
					Output
				</Text>
			</Box>
			<Box flex={1} p="md" style={{ overflow: "auto" }}>
				{!output ? (
					<Text c="dimmed" size="sm">
						Click "Run Code" to see the output here...
					</Text>
				) : output.success ? (
					<Code block c="green">
						{output.output}
					</Code>
				) : (
					<Stack gap="xs">
						{output.output && <Code block>{output.output}</Code>}
						<Code block c="red">
							{output.error}
						</Code>
					</Stack>
				)}
			</Box>
		</Flex>
	);
}
