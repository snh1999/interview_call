import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import { IconMessage, IconUser, IconX } from "@tabler/icons-react";
import type { Channel as ChatChannel, StreamChat } from "stream-chat";

function VideoCallUI({
  chatClient,
  channel,
}: {
  chatClient: StreamChat | null;
  channel: ChatChannel | null;
}) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <Center h="100%">
        <Stack align="center">
          <Loader size={48} />
          <Text size="lg">Joining call...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Flex h="100%" gap="md" pos="relative" className="str-video">
      <Stack flex={1} gap="md">
        <Paper p="sm" withBorder>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="sm">
              <IconUser size={20} color="var(--mantine-color-blue-6)" />
              <Text fw={600}>
                {participantCount}{" "}
                {participantCount === 1 ? "participant" : "participants"}
              </Text>
            </Flex>
            {chatClient && channel && (
              <Button
                variant={isChatOpen ? "filled" : "light"}
                size="sm"
                leftSection={<IconMessage size={16} />}
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                Chat
              </Button>
            )}
          </Flex>
        </Paper>

        <Box
          flex={1}
          bg="gray.3"
          style={{
            borderRadius: "var(--mantine-radius-md)",
            overflow: "hidden",
          }}
        >
          <SpeakerLayout />
        </Box>

        <Paper p="sm" withBorder>
          <Flex justify="center">
            <CallControls onLeave={() => navigate("/dashboard")} />
          </Flex>
        </Paper>
      </Stack>

      {chatClient && channel && (
        <Paper
          withBorder
          style={{
            backgroundColor: "#272a30",
            width: isChatOpen ? 320 : 0,
            opacity: isChatOpen ? 1 : 0,
            overflow: "hidden",
            transition: "all 300ms ease-in-out",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isChatOpen && (
            <>
              <Flex
                p="sm"
                justify="space-between"
                align="center"
                style={{
                  backgroundColor: "#1c1e22",
                  borderBottom: "1px solid #3a3d44",
                }}
              >
                <Text fw={600} c="white">
                  Session Chat
                </Text>
                <Button
                  variant="subtle"
                  size="compact-sm"
                  onClick={() => setIsChatOpen(false)}
                  style={{ color: "#9ca3af" }}
                >
                  <IconX size={20} />
                </Button>
              </Flex>
              <Box
                flex={1}
                style={{ overflow: "hidden" }}
                className="stream-chat-dark"
              >
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </Box>
            </>
          )}
        </Paper>
      )}
    </Flex>
  );
}

export default VideoCallUI;
