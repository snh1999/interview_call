import type { Call, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { type Channel, StreamChat } from "stream-chat";
import { disconnectStreamClient, initializeStreamClient } from "../lib/stream";
import type { ISession } from "../store/api/api.types";
import { useGetSessionTokenQuery } from "../store/api/session";

interface IProps {
  session?: ISession;
  loadingSession: boolean;
  userType?: "host" | "participant";
}

function useStreamClient({ session, loadingSession, userType }: IProps) {
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(
    null
  );
  const [call, setCall] = useState<Call | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);
  const { data: tokenPayload } = useGetSessionTokenQuery();

  useEffect(() => {
    let videoCall: Call | null = null;
    let chatClientInstance: StreamChat | null = null;

    const initCall = async () => {
      if (!session?.callId) return;
      if (session.status === "completed") return;

      if (!userType || !tokenPayload) return;

      try {
        const { token, userId, name } = tokenPayload;

        const client = await initializeStreamClient(
          { id: userId, name },
          token
        );

        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser({ id: userId, name }, token);
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId
        );
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error init call", error);
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    return () => {
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session, loadingSession, tokenPayload, userType]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
