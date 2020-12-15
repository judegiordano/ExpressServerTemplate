import { Request, Response, NextFunction, RequestHandler } from "express";
import { verify } from "@util/jwt";

const authenticateToken: RequestHandler =
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const authHeader = req.headers["authorization"];

		const token = authHeader && authHeader.split(" ")[1];

		if (token == null) {
			res.locals.jwt = null;
			return next();
		}

		try {
			const payload = await verify(token);
			if (payload) {
				res.locals.jwt = payload;
				return next();
			}

			res.locals.jwt = null;
			return next();
		} catch (error) {
			res.locals.jwt = null;
			return next();
		}
	};

export default authenticateToken;