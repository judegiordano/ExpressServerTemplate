import config from "@util/config";
import logger from "./logger";
import connect from "./database";
import app from "../routes/index";

const start = async (): Promise<void> => {
	try {
		await connect();
	} catch (error) {
		logger.error(`Failed to connect to server.\n${error}`);
		process.exit(-1);
	}
	app.listen(config.PORT, () => {
		logger.info(`server started at http://localhost:${config.PORT}`);
	});
};

export default start;