import mongoose from "mongoose";
import config from "@util/config";
import logger from "./logger";

const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(config.CONNECTION_STRING as string, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const db = mongoose.connection;
		db.once("open", () => logger.info(`connected to ${db.name}`));
	} catch (e) {
		throw new Error(e);
	}
};

export default connect;