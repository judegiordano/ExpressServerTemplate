import os from "os";
import config from "./utility/config";
import cluster from "cluster";
import logger from "./services/logger";
import start from "./services/startServer";

if (cluster.isMaster && config.NODE_ENV === "production") {
	const cpus = os.cpus().length;
	logger.info(`${cpus} slave clusters created`);
	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}
} else if (cluster.isMaster) {
	start();
	// implement more logic for master
} else {
	start();
}