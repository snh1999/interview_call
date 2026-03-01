import path from "node:path";
import express from "express";
import { ENV } from "#lib/env";
import { middleware } from "#middlewares/middleware";

const app = express();
const port = ENV.PORT;

const __dirname = path.resolve();

app.get("/", middleware);

if (ENV.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("/{*any}", (_, res) => {
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
}

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
