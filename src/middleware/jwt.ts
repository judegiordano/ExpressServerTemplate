import Koa from "koa";
import { verify } from "../helpers/jwt";

const authenticateToken = async (ctx: Koa.Context, next: Koa.Next) => {
	const authHeader = ctx.header["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		ctx.state.jwt = null;
		throw new Error("Invalid token");
	}

	try {
		const payload = await verify(token);
		if (!payload) {
			ctx.state.jwt = null;
			throw new Error("Invalid token");
		}

		ctx.state.jwt = payload;
		return next();
	} catch (e) {
		ctx.state.jwt = null;
		throw new Error(e);
	}
};

export default authenticateToken;