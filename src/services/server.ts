import Koa from "koa";
import logger from "koa-logger";
import compress from "koa-compress";
import bodyParser from "koa-bodyparser";
import ratelimit from "koa-ratelimit";
import json from "koa-json";
import cors from "koa-cors";
import helmet from "koa-helmet";

import log from "../helpers/logger";
import router from "../controllers";
import { IErr } from "../types/IRoute";

const app = new Koa();
const map = new Map();
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
	try {
		await next();
	} catch (e) {
		log.error(e.message);
		ctx.status = 500;
		ctx.body = {
			ok: false,
			status: ctx.status,
			error: e.message,
			raw: e.toString()
		} as IErr;
	}
});
app.use(ratelimit({
	driver: "memory",
	db: map,
	duration: (60000 * 10), // 10 minutes
	errorMessage: "Too Many Requests. Please Try Again later.",
	id: (ctx) => ctx.ip,
	headers: {
		remaining: "Rate-Limit-Remaining",
		reset: "Rate-Limit-Reset",
		total: "Rate-Limit-Total"
	},
	max: 15,
	disableHeader: false
}));
app.use(cors());
app.use(json());
app.use(logger());
app.use(helmet());
app.use(compress());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;