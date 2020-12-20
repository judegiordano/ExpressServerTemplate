import mongoose from "mongoose";
import config from "../services/config";
import log from "./logger";

const DB_URL = config.CONNECTION_STRING;

const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(DB_URL as string, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const db = mongoose.connection;
		db.once("open", () => log.info(`connected to ${db.name}`));
	} catch (e) {
		throw new Error(e);
	}
};

export default connect;
