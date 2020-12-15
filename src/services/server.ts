import express, { RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import responseTime from "response-time";
import compression from "compression";
import bodyParser from "body-parser";
import config from "@util/config";

const app = express();
app.disable("x-powered-by");
app.set("json spaces", 2);
app.use(morgan("common") as RequestHandler);
app.use(responseTime());
app.use(helmet());
app.use(rateLimit(config.RATE_LIMIT));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors({
	origin: "*",
	methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type", "Authorization"]
}) as RequestHandler);

export default app;