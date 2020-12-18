import os from "os";
import cluster from "cluster";
import config from "./services/config";
import log from "./services/logger";
import app from "./services/server";
import connect from "./services/database";

const start = async (): Promise<void> => {
	try {
		await connect();
	} catch (error) {
		log.error(`Failed to connect to server.\n${error}`);
		process.exit(-1);
	}
	app.listen(config.PORT, () => {
		log.info(`server started at http://localhost:${config.PORT}`);
	});
};

if (cluster.isMaster && config.NODE_ENV === "production") {
	const cpus = os.cpus().length;
	log.info(`${cpus} slave clusters created`);
	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}
} else if (cluster.isMaster) {
	start();
} else {
	start();
}