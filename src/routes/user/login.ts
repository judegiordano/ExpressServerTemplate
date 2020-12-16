import express, { Request, Response } from "express";
import User from "@repos/UserRepository";
import { sign } from "@util/jwt";
const router = express.Router();
const db = new User();

router.post("/", async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.password || !req.body.email) {
		return res.status(500).send({ ok: false, error: "missing user body" });
	}

	try {
		const user = await db.Login(req.body);

		const jwt = await sign({
			_id: user._id,
			email: user.email,
			created: user.created,
			activated: user.activated
		});

		return res.status(200).send({
			token: jwt
		});
	} catch (e) {
		return res.status(500).send({ ok: false, error: e.message });
	}
});

export default router;