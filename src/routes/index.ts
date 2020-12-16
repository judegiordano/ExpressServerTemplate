import app from "../services/server";
import config from "@util/config";
// middleware
import validate from "../middleware/authenticateToken";
// routes
import login from "./user/login";
import register from "./user/register";
import updateEmail from "./user/updateEmail";
import decodeJwt from "./user/decodeJwt";

const { LIMIT } = config;

app.use("/api/user/login", LIMIT, login);
app.use("/api/user/register", LIMIT, register);
app.use("/api/user/update/email", LIMIT, validate, updateEmail);
app.use("/api/jwt/decode", validate, decodeJwt);
app.get("*", async (req, res) => {
	res.status(404).send("Not Found");
});

export default app;