import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { authRouter } from "#auth/auth.route";
import { connectDB } from "#lib/db";
import { ENV } from "#lib/env";
import { errorHandler } from "#middlewares/error-handler";

const app = express();
const port = ENV.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:8080",
		credentials: true,
	}),
);

app.use("/api/auth", authRouter);

app.use(errorHandler);

if (ENV.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("/{*any}", (_req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
}

async function startServer() {
	await connectDB();
	try {
		app.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	} catch (error) {
		console.error("Error Starting server", error);
	}
}

startServer();
