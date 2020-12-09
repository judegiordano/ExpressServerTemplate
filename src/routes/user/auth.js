const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
	if (res.locals.jwt === null) {
		return res.status(401).send({
			authorized: false,
			error: "invalid jwt"
		});
	}
	res.status(200).send(res.locals.jwt);
});

module.exports = router;