import { Box, Text } from "@mantine/core";
import { Editor } from "@monaco-editor/react";

interface Props {
	languageName: string;
	label: string;
	value: string;
	error?: React.ReactNode;
	setValue: (value?: string) => void;
}

export default function CodeInput({
	languageName,
	label,
	value,
	error,
	setValue,
}: Props) {
	return (
		<Box>
			<Text size="sm" fw={500} mb={4}>
				{`${languageName[0].toUpperCase()}${languageName.slice(1)} ${label}`}
			</Text>
			<Editor
				height="200px"
				language={languageName.toLowerCase()}
				value={value}
				onChange={setValue}
				options={{
					minimap: { enabled: false },
					fontSize: 14,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
			{error && (
				<Text size="xs" c="red" mt={4}>
					{error}
				</Text>
			)}
		</Box>
	);
}
