export const ENV = {
	PORT: process.env.PORT ?? "3000",
	NODE_ENV: process.env.NODE_ENV,
	DB_URL: process.env.DB_URL,
	JWT_SECRET: process.env.JWT_SECRET ?? "",
	JWT_MAX_AGE: Number(process.env.JWT_MAX_AGE_DAYS),
	JWT_EXPIRES: (process.env.JWT_EXPIRES ??
		"7d") as `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`,
};
