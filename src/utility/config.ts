import dotenv from "dotenv";
import slowDown from "express-slow-down";
dotenv.config();

const config = {
	PORT: process.env.PORT || 3000,
	CONNECTION_STRING: process.env.CONNECTION_STRING ?? "",
	JWT_SECRET: process.env.JWT_SECRET ?? "",
	NODE_ENV: process.env.NODE_ENV ?? "development",
	RATE_LIMIT: {
		windowMs: 15 * 60 * 1000,
		max: 50
	},
	LIMIT: slowDown({
		windowMs: 60 * 60 * 1000, // every 1 hour
		delayAfter: 15, // allow 15 requests
		delayMs: 1000 // before slowing by 1000ms subsequently
	})
};

if (!config.JWT_SECRET) {
	throw new Error("JWT_SECRET is not set.");
}
if (!config.CONNECTION_STRING) {
	throw new Error("CONNECTION_STRING is not set.");
}

export default config;