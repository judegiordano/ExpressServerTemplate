const express = require("express");
const router = express.Router();
const sign = require("../../utility/jwt").sign;
const UserController = require("../../controllers/UserController");

// insntiate controller context
const db = new UserController();

router.post("/", async (req, res) => {
	// ensure body params
	if (!req.body.password || !req.body.email) {
		return res.status(500).send("missing user body");
	}
	try {
		// pass body object
		const user = await db.Login(req.body);
		// sign custom token
		const jwt = await sign({
			guid: user.guid,
			email: user.email,
			created: user.created
		});
		// return signed jwt
		res.status(200).send({
			token: jwt
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;