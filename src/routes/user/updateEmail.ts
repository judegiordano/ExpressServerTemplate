import express, { Request, Response } from "express";
import User from "@repos/UserRepository";
import { IUpdateEmail } from "../../types/IUserActions";
import { IJwtPayload } from "../../types/IJWT";
import { IError } from "../../types/IRoute";
import { sign } from "@util/jwt";
const router = express.Router();
const db = new User();

router.post("/", async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.email) {
		return res.status(500).send({
			ok: false,
			error: "missing user body"
		} as IError);
	}

	try {
		const user = await db.UpdateEmail({
			id: res.locals.jwt._id,
			email: res.locals.jwt.email,
			newMail: req.body.email
		} as IUpdateEmail);

		const _token = await sign({
			_id: user._id,
			email: user.email,
			created: user.created,
			activated: user.activated
		} as IJwtPayload);

		return res.status(200).send({
			token: _token
		});
	}
	catch (e) {
		return res.status(500).json({
			ok: false,
			error: e.message
		} as IError);
	}
});

export default router;