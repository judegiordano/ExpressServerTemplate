const express = require("express");
const router = express.Router();
const sign = require("../../utility/jwt").sign;
const UserController = require("../../controllers/UserController");

const db = new UserController();

router.post("/", async (req, res) => {
	if (!req.body.password || !req.body.email) {
		return res.status(500).send("missing user body");
	}
	try {
		const user = await db.Login(req.body);

		const jwt = await sign({
			_id: user._id,
			email: user.email,
			created: user.created,
			activated: user.activated,
		});

		res.status(200).send({
			token: jwt,
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
