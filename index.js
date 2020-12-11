const app = require("./src/utility/server").app;
const routes = require("./src/routes/index");
const authenticateToken = require("./src/middleware/authenticateToken");
const connect = require("./src/utility/database");
const logger = require("./src/utility/logger");
const config = require("./src/utility/config");

app.use("/api/user/login", routes.login);
app.use("/api/user/register", routes.register);
app.use("/api/validate", authenticateToken, routes.auth);
app.use("*", (req, res) => res.status(404).send("not found"));
// wrap listen in db call
connect().then(client => {
	const database = client.db(config.DATABASE);
	const collection = database.collection(config.COLLECTION);
	logger.info(`Connected to ${config.DATABASE}:${config.COLLECTION}`);
	app.locals.context = collection;
	app.listen(config.PORT, () => {
		logger.info(`http://localhost:${config.PORT}`);
	});
}).catch(e => {
	throw new Error(e);
});