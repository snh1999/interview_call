const PORT = process.env.PORT ?? "3000";
const NODE_ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

if (!DB_URL || !JWT_SECRET || !STREAM_API_KEY || !STREAM_API_SECRET) {
	const errorMessage = `Missing env variable:
	${!DB_URL ? "DB_URL" : ""}
	${!JWT_SECRET ? "JWT_SECRET" : ""}
	${!STREAM_API_KEY ? "STREAM_API_KEY" : ""}
	${!STREAM_API_SECRET ? "STREAM_API_SECRET" : ""}
	`;
	console.error(errorMessage);
	throw new Error(errorMessage);
}

export const ENV = {
	PORT,
	NODE_ENV,
	DB_URL,
	JWT_SECRET,
	JWT_MAX_AGE: Number(process.env.JWT_MAX_AGE_DAYS),
	JWT_EXPIRES: (process.env.JWT_EXPIRES ??
		"7d") as `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`,
	STREAM_API_KEY,
	STREAM_API_SECRET,
};
