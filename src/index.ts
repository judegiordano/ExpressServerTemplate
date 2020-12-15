import os from "os";
import config from "./utility/config";
import cluster from "cluster";
import logger from "./services/logger";
import start from "./services/startServer";

if (cluster.isMaster && config.NODE_ENV === "production") {
	const cpus = os.cpus().length;
	const mem = os.totalmem();
	logger.info(`Creating ${cpus} workers with ${mem} bytes of memory.`);
	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}
} else if (cluster.isMaster) {
	start();
} else {
	start();
}