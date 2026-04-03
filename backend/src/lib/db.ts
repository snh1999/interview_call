import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(ENV.DB_URL ?? "");
    console.log("Connected to database", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}
