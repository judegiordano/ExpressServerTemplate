import Router from "koa-router";
import { ILogin, IRegister, IUpdateEmail } from "../types/IUserActions";
import { IJwtPayload } from "../types/IJWT";
import { sign } from "../services/jwt";
import jwt from "../middleware/jwt";
import user from "../repositories/UserRepository";

const router = new Router({ prefix: "/user" });

router.post("/login", async (ctx, next) => {
	const req = <ILogin>ctx.request.body;
	if (!req.email || !req.password) {
		throw new Error("missing body { email, password }");
	}

	try {
		const query = await user.Login({
			email: req.email,
			password: req.password
		} as ILogin);

		const _token = await sign({
			_id: query._id,
			email: query.email,
			created: query.created,
			activated: query.activated
		} as IJwtPayload);

		ctx.status = 200;
		ctx.body = { token: _token };
		await next();
	} catch (e) {
		throw new Error(e);
	}
});

router.post("/register", async (ctx, next) => {
	const req = <IRegister>ctx.request.body;
	if (!req.email || !req.password) {
		throw new Error("missing body { email, password }");
	}

	try {
		const query = await user.Register({
			email: req.email,
			password: req.password
		} as IRegister);

		const _token = await sign({
			_id: query._id,
			email: query.email,
			created: query.created,
			activated: query.activated
		} as IJwtPayload);

		ctx.status = 200;
		ctx.body = { token: _token };
		await next();
	} catch (e) {
		throw new Error(e);
	}
});

router.post("/update/email", async (ctx, next) => {
	const req = <IUpdateEmail>ctx.request.body;
	if (!req.newEmail) {
		throw new Error("missing body { newEmail }");
	}

	try {
		const query = await user.UpdateEmail({
			id: ctx.state.jwt._id,
			email: ctx.state.jwt.email,
			newEmail: req.newEmail
		} as IUpdateEmail);

		const _token = await sign({
			_id: query._id,
			email: query.email,
			created: query.created,
			activated: query.activated
		} as IJwtPayload);

		ctx.status = 200;
		ctx.body = { token: _token };
		await next();
	} catch (e) {
		throw new Error(e);
	}
});

router.post("/validate", jwt, async (ctx, next) => {
	ctx.body = ctx.state.jwt;
	await next();
});

export default router;