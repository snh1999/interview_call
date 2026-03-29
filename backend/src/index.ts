import path from "node:path";
import express from "express";
import { connectDB } from "#lib/db";
import { ENV } from "#lib/env";
import { errorHandler } from "#middlewares/error-handler";
import { userRouter } from "#routes/user";

const app = express();
const port = ENV.PORT;

const __dirname = path.resolve();

app.use(express.json());

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

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
