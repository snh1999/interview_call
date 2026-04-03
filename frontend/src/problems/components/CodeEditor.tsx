import { Box, Button, Flex, Group, Loader, Select } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { executeCode } from "../../lib/piston";
import { setOutput } from "../../store/slices/problemSlice";
import { useAppDispatch } from "../../store/store";
import type { TProblem } from "../form/problem.helper";

interface Props {
  selectedProblem: TProblem;
}

export function CodeEditorPanel({ selectedProblem }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setLanguage] = useState(0);
  const language = selectedProblem.languages[selectedLanguage];
  const [code, setCode] = useState(
    () => selectedProblem?.languages?.[0]?.starterCode ?? ""
  );

  const dispatch = useAppDispatch();
  if (!selectedProblem) {
    return null;
  }

  const handleLanguageChange = (val: string | null) => {
    if (!val) {
      return;
    }
    const newLanguage = selectedProblem.languages[Number(val)];
    setLanguage(Number(val));
    setCode(newLanguage.starterCode);
    dispatch(setOutput(null));
  };

  const normalizeOutput = (output: string) => {
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput: string, expectedOutput: string) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    return normalizedActual === normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    dispatch(setOutput(null));

    const result = await executeCode(language.name, code ?? "");
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = language.expectedOutput;
      const testsPassed = checkIfTestsPassed(
        result.output ?? "",
        expectedOutput as string
      );

      if (testsPassed) {
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <Flex bg="gray.3" direction="column" h="100%">
      <Group
        bg="gray.0"
        justify="space-between"
        px="md"
        py="sm"
        style={{ borderTop: "1px solid var(--mantine-color-gray-4)" }}
      >
        <Group gap="sm">
          <Select
            data={selectedProblem.languages.map((language, idx) => ({
              value: idx.toString(),
              label: language.name,
            }))}
            onChange={handleLanguageChange}
            size="sm"
            value={selectedLanguage.toString()}
          />
        </Group>

        <Button
          color="pink"
          leftSection={isRunning ? <Loader /> : <IconPlayerPlay size={16} />}
          loading={isRunning}
          onClick={handleRunCode}
          size="sm"
        >
          {isRunning ? "Running..." : "Run Code"}
        </Button>
      </Group>

      <Box flex={1}>
        <Editor
          height="100%"
          language={language.name.toLowerCase()}
          onChange={(val) => {
            setCode(val ?? "");
          }}
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
          theme="vs-dark"
          value={code}
        />
      </Box>
    </Flex>
  );
}
