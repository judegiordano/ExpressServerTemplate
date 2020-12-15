import app from "../services/server";
import config from "@util/config";
import login from "./user/login";
import register from "./user/register";
import auth from "./user/authenticate";
import validate from "../middleware/authenticateToken";

app.use("/api/user/login", config.LIMIT, login);
app.use("/api/user/register", config.LIMIT, register);
app.use("/api/user/validate", validate, auth);
app.get("*", async (req, res) => {
	res.status(404).send("Not Found");
});

export default app;