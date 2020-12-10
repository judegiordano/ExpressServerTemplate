const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	// check for jwt in local memory
	if (res.locals.jwt === null) {
		// if no token return not authorized
		return res.status(401).send({
			authorized: false,
			error: "invalid jwt"
		});
	}
	// if success return jwt
	res.status(200).send(res.locals.jwt);
});

module.exports = router;