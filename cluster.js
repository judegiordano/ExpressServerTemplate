const cluster = require("cluster");
const os = require("os");
const logger = require("./src/utility/logger.js");

const CPUS = os.cpus();
if (cluster.isMaster) {
	CPUS.forEach(() => {
		cluster.fork();
	});
	cluster.on("listening", (worker) => {
		logger.info("Cluster %d connected", worker.process.pid);
	});
	cluster.on("disconnect", (worker) => {
		logger.info("Cluster %d disconnected", worker.process.pid);
	});
	cluster.on("exit", (worker) => {
		logger.info("Cluster %d is dead", worker.process.pid);
		cluster.fork();
	});
} else {
	require("./index.js");
}