import express, { Request, Response } from "express";
import User from "@repos/UserRepository";
import { sign } from "@util/jwt";
const router = express.Router();
const db = new User();

router.post("/", async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.email) {
		return res.status(500).send({ ok: false, error: "missing user body" });
	}

	const { jwt } = res.locals;
	const { email } = req.body;

	try {
		const user = await db.UpdateEmail(jwt._id, jwt.email, email);

		const _token = await sign({
			_id: user._id,
			email: user.email,
			created: user.created,
			activated: user.activated
		});

		return res.status(200).send({
			token: _token
		});
	}
	catch (e) {
		return res.status(500).json({ ok: false, error: e.message });
	}
});

export default router;