import express, { Response } from "express";
import IRoute from "../../types/IRoute";
const router = express.Router();

router.post("/", async ({ res }: IRoute): Promise<Response> => {
	if (res.locals.jwt === null) {
		return res.status(401).send({
			authorized: false,
			error: "invalid jwt",
		});
	}
	return res.status(200).send(res.locals.jwt);
});

export default router;