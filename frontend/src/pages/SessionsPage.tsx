import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { IconPhoneCall } from "@tabler/icons-react";
import { useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { ResizeHandle } from "../components/ResizeHandle";
// import VideoCallUI from "../components/VideoCallUI";
// import useStreamClient from "../hooks/useStreamClient";
import { CodeEditorPanel } from "../problems/components/CodeEditor";
import { OutputPanel } from "../problems/components/OutputPanel";
import useStreamClient from "../session/session.hooks";
import VideoCallUI from "../session/VideoCallUI";
import {
  useEndSessionMutation,
  useGetSessionByIdQuery,
  useJoinSessionMutation,
} from "../store/api/session";
import { useAppSelector } from "../store/store";

export default function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);

  const { data: sessionData, isLoading: loadingSession } =
    useGetSessionByIdQuery(id, {
      skip: !id,
    });

  const [joinSessionMutation] = useJoinSessionMutation();
  const [endSessionMutation] = useEndSessionMutation();

  const session = sessionData?.session;
  const isHost = session?.host._id === user?.id;
  const isParticipant = session?.participant?._id === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient({
      session,
      loadingSession,
      userType: isHost ? "host" : isParticipant ? "participant" : undefined,
    });

  useEffect(() => {
    if (!session || !user || !id || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation(id);
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  const handleEndSession = () => {
    if (
      id &&
      confirm(
        "Are you sure you want to end this session? All participants will be notified."
      )
    ) {
      endSessionMutation(id);
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "green";
      case "medium":
        return "yellow";
      case "hard":
        return "red";
      default:
        return "gray";
    }
  };

  if (!session) return null;

  const problem = session.problem;

  return (
    <Box
      h="100vh"
      bg="gray.0"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <Box flex={1}>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={50} minSize={20}>
                <Box h="100%" style={{ overflowY: "auto" }} bg="gray.1">
                  <Paper
                    p="xl"
                    bg="white"
                    withBorder
                    style={{
                      borderBottom: "1px solid var(--mantine-color-gray-3)",
                    }}
                  >
                    <Flex justify="space-between" align="flex-start" mb="xs">
                      <Box>
                        <Title order={1} size="h2">
                          {problem.title || "Loading..."}
                        </Title>
                        {problem.categories.map((val) => (
                          <Text key={val} c="dimmed" mt={4}>
                            {val}
                          </Text>
                        ))}
                        <Text c="dimmed" mt={8}>
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </Text>
                      </Box>

                      <Flex gap="md" align="center">
                        <Badge
                          size="lg"
                          color={getDifficultyColor(session?.difficulty)}
                        >
                          {session?.difficulty?.charAt(0).toUpperCase() +
                            session?.difficulty?.slice(1) || "Easy"}
                        </Badge>
                        {isHost && session?.status === "active" && (
                          <Button
                            color="red"
                            size="sm"
                            // leftSection={
                            // 	endSessionMutation.isPending ? (
                            // 		<Loader size={16} />
                            // 	) : (
                            // 		<IconLogout size={16} />
                            // 	)
                            // }
                            onClick={handleEndSession}
                            // loading={endSessionMutation.isPending}
                          >
                            End Session
                          </Button>
                        )}
                        {session?.status === "completed" && (
                          <Badge size="lg" variant="light">
                            Completed
                          </Badge>
                        )}
                      </Flex>
                    </Flex>
                  </Paper>

                  <Stack p="xl" gap="xl">
                    {
                      <Paper p="xl" withBorder bg="white">
                        <Title order={2} size="h4" mb="md">
                          Description
                        </Title>
                        <Stack gap="sm">
                          <Text>{problem.description.text}</Text>
                          {problem.description.notes?.map((note) => (
                            <Text key={note}>{note}</Text>
                          ))}
                        </Stack>
                      </Paper>
                    }

                    {problem.examples.length > 0 && (
                      <Paper p="xl" withBorder bg="white">
                        <Title order={2} size="h4" mb="md">
                          Examples
                        </Title>
                        <Stack gap="md">
                          {problem.examples.map((example, idx) => (
                            <Box key={example.input}>
                              <Flex align="center" gap="sm" mb="xs">
                                <Badge>{idx + 1}</Badge>
                                <Text fw={600}>Example {idx + 1}</Text>
                              </Flex>
                              <Paper p="md" bg="gray.1" withBorder>
                                <Stack gap="xs">
                                  <Flex gap="sm">
                                    <Text fw={700} c="blue" w={70}>
                                      Input:
                                    </Text>
                                    <Text ff="monospace">{example.input}</Text>
                                  </Flex>
                                  <Flex gap="sm">
                                    <Text fw={700} c="green" w={70}>
                                      Output:
                                    </Text>
                                    <Text ff="monospace">{example.output}</Text>
                                  </Flex>
                                  {example.explanation && (
                                    <Box
                                      pt="xs"
                                      mt="xs"
                                      style={{
                                        borderTop:
                                          "1px solid var(--mantine-color-gray-3)",
                                      }}
                                    >
                                      <Text size="sm" c="dimmed">
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
                    )}

                    {problem.constraints.length > 0 && (
                      <Paper p="xl" withBorder bg="white">
                        <Title order={2} size="h4" mb="md">
                          Constraints
                        </Title>
                        <Stack gap="xs">
                          {problem.constraints.map((constraint) => (
                            <Flex key={constraint} gap="sm">
                              <Text c="blue">•</Text>
                              <Text ff="monospace" size="sm">
                                {constraint}
                              </Text>
                            </Flex>
                          ))}
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </Box>
              </Panel>

              <ResizeHandle />

              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel selectedProblem={problem} />
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          <Panel defaultSize={50} minSize={30}>
            <Box h="100%" bg="gray.1" p="md" style={{ overflow: "auto" }}>
              {isInitializingCall ? (
                <Center h="100%">
                  <Stack align="center">
                    <Loader size={48} />
                    <Text size="lg">Connecting to video call...</Text>
                  </Stack>
                </Center>
              ) : !streamClient || !call ? (
                <Center h="100%">
                  <Card withBorder p="xl">
                    <Stack align="center">
                      <Paper
                        w={96}
                        h={96}
                        bg="red.1"
                        style={{
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconPhoneCall
                          size={48}
                          color="var(--mantine-color-red-6)"
                        />
                      </Paper>
                      <Title order={2} size="h3">
                        Connection Failed
                      </Title>
                      <Text c="dimmed">
                        Unable to connect to the video call
                      </Text>
                    </Stack>
                  </Card>
                </Center>
              ) : (
                <Box h="100%">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </Box>
              )}
            </Box>
          </Panel>
        </PanelGroup>
      </Box>
    </Box>
  );
}
