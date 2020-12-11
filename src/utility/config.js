require("dotenv").config();

const config = {
	PORT: process.env.PORT || 2020,
	CONNECTION_STRING: process.env.CONNECTION_STRING,
	DATABASE: process.env.DATABASE,
	COLLECTION: process.env.COLLECTION,
	JWT_SECRET: process.env.JWT_SECRET,
	SALT: process.env.SALT,
	NODE_ENV: process.env.NODE_ENV
};

module.exports = config;