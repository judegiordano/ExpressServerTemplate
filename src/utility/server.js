const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const app = require("express")();
const config = require("./config");

app.disable("x-powered-by");
app.set("json spaces", 2);
app.use(morgan("common"));
app.use(helmet());
app.use(rateLimit(config.RATE_LIMIT));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors({
	origin: ["http://localhost:3001"],
	methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

module.exports = {
	app
};