require("dotenv").config();
const app = require("./src/utility/server").app;
const routes = require("./src/routes/index");
const authenticateToken = require("./src/middleware/authenticateToken");
const connect = require("./src/utility/database");

const PORT = process.env.PORT || 2020;
const {
	COLLECTION,
	DATABASE,
	IS_PROD
} = process.env;

app.use("/api/user/login", routes.login);
app.use("/api/user/register", routes.register);
app.use("/api/validate", authenticateToken, routes.auth);
app.use("*", (req, res) => res.status(404).send("not found"));
// wrap listen in db call
connect().then(client => {
	const database = client.db(DATABASE);
	const collection = database.collection(COLLECTION);
	if (IS_PROD == "false") console.log(`Connected to ${DATABASE}:${COLLECTION}`);
	// pass to routes
	app.locals.context = collection;
	app.listen(PORT, () => {
		if (IS_PROD == "false") console.log(`http://localhost:${PORT}`);
	});
}).catch(e => {
	throw new Error(e);
});