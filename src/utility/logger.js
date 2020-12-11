const {
	createLogger,
	format,
	transports
} = require("winston");

const {
	combine,
	timestamp,
	json,
	prettyPrint
} = format;

const config = require("./config");

const logger = createLogger({
	level: "info",
	format: combine(
		json(),
		timestamp(),
		prettyPrint()
	),
	defaultMeta: {
		service: "user-service"
	},
	transports: [
		new transports.File({
			filename: "error.log",
			level: "error"
		}),
		new transports.File({
			filename: "combined.log",
			level: "info"
		}),
	],
});

if (config.NODE_ENV !== "production") {
	logger.add(new transports.Console({
		format: format.simple(),
	}));
}

module.exports = logger;