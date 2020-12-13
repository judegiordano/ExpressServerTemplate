require("dotenv").config();
const slowDown = require("express-slow-down");

const config = {
	PORT: process.env.PORT || 3000,
	CONNECTION_STRING: process.env.CONNECTION_STRING,
	DATABASE: process.env.DATABASE,
	COLLECTION: process.env.COLLECTION,
	JWT_SECRET: process.env.JWT_SECRET,
	SALT: process.env.SALT,
	NODE_ENV: process.env.NODE_ENV,
	RATE_LIMIT: {
		windowMs: 15 * 60 * 1000,
		max: 100
	},
	speedLimiter: slowDown({
		windowMs: 15 * 60 * 1000,
		delayAfter: 50,
		delayMs: 1000
	})
};

module.exports = config;