const mongoose = require("mongoose");
const config = require("../utility/config");
const logger = require("./logger");

const connect = () => {
	try {
		mongoose.connect(config.CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const db = mongoose.connection;
		db.once("open", () => logger.info(`connected to ${db.name}`));
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = connect;