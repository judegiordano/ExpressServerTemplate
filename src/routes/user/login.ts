import express, { Request, Response } from "express";
import User from "@repos/UserRepository";
import { IJwtPayload } from "../../types/IJWT";
import { ILogin } from "../../types/IUserActions";
import { IError } from "../../types/IRoute";
import { sign } from "@util/jwt";
const router = express.Router();
const db = new User();

router.post("/", async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.password || !req.body.email) {
		return res.status(500).send({
			ok: false,
			error: "missing user body"
		} as IError);
	}

	try {
		const user = await db.Login({
			email: req.body.email,
			password: req.body.password
		} as ILogin);

		const _token = await sign({
			_id: user._id,
			email: user.email,
			created: user.created,
			activated: user.activated
		} as IJwtPayload);

		return res.status(200).send({
			token: _token
		});
	} catch (e) {
		return res.status(500).send({
			ok: false,
			error: e.message
		} as IError);
	}
});

export default router;