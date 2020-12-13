const app = require("./src/utility/server");
const routes = require("./src/routes/index");
const authenticateToken = require("./src/middleware/authenticateToken");
const connect = require("./src/utility/database");
const logger = require("./src/utility/logger");
const config = require("./src/utility/config");

connect();
app.use("/api/user/login", routes.login);
app.use("/api/user/register", routes.register);
app.use("/api/validate", authenticateToken, routes.auth);
app.use("*", (req, res) => res.status(404).send("not found"));
app.listen(config.PORT, () => {
	logger.info(`http://localhost:${config.PORT}`);
});