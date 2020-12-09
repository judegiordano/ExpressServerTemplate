require("dotenv").config();
const verify = require("../utility/jwt").verify;

async function authenticateToken(req, res, next) {
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
}

module.exports = authenticateToken;