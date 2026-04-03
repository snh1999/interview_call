import { StreamClient } from "@stream-io/node-sdk";
import { StreamChat, type UserResponse } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);
export const streamVideoClient = new StreamClient(apiKey, apiSecret);

export const upsertStreamUser = async (userData: UserResponse) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Updated Stream User", userData);
    return userData;
  } catch (error) {
    console.error("Error updating stream user:", error);
  }
};

export const deleteStreamUser = async (userId: string) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Deleted Stream User", userId);
  } catch (error) {
    console.error("Error deleting stream user:", error);
  }
};
