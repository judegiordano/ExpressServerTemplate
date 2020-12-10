require("dotenv").config();
const app = require("./src/utility/server").app;
const routes = require("./src/routes/index");
const authenticateToken = require("./src/middleware/authenticateToken");

const PORT = process.env.PORT || 2020;

app.use("/api/user/login", routes.login);
app.use("/api/user/register", routes.register);
app.use("/api/validate", authenticateToken, routes.auth);
app.use("*", (req, res) => res.status(404).send("not found"));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));