import app from "./server";
import config from "@util/config";
import logger from "./logger";
import connect from "./database";
import * as routes from "../routes";
import validate from "../middleware/authenticateToken";

const start = async (): Promise<void> => {
	try {
		await connect();
	} catch (error) {
		logger.error(`Failed to connect to server.\n${error}`);
		process.exit(-1);
	}
	app.use("/api/user/login", config.limit, routes.login);
	app.use("/api/user/register", config.limit, routes.register);
	app.use("/api/user/validate", validate, routes.auth);
	app.get("*", async (req, res) => {
		res.status(404).send("Not Found");
	});
	app.listen(config.PORT, () => {
		logger.info(`server started at http://localhost:${config.PORT}`);
	});
};

export default start;