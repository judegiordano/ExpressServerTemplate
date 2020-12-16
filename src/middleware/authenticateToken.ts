import { Request, Response, NextFunction, RequestHandler } from "express";
import { verify } from "@util/jwt";

const authenticateToken: RequestHandler =
	async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
		const authHeader = req.headers["authorization"];

		const token = authHeader && authHeader.split(" ")[1];

		if (token == null) {
			res.locals.jwt = null;
			return res.status(401).send({
				ok: false,
				error: "invalid jwt",
			});
		}

		try {
			const payload = await verify(token);
			if (!payload) {
				res.locals.jwt = null;
				return res.status(500).send({
					ok: false,
					error: "invalid jwt",
				});
			}

			res.locals.jwt = payload;
			return next();
		} catch (e) {
			res.locals.jwt = null;
			return res.status(500).send({
				ok: false,
				error: e.message,
			});
		}
	};

export default authenticateToken;