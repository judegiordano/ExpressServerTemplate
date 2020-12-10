require("dotenv").config();
const verify = require("../utility/jwt").verify;

// validate JWT
async function authenticateToken(req, res, next) {
	// check req header
	const authHeader = req.headers["authorization"];
	// split by bearer: token
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		// null jwt if no token
		res.locals.jwt = null;
		return next();
	}

	try {
		// verify jwt by algorithm
		const payload = await verify(token);
		if (payload) {
			// send to token to local memory
			res.locals.jwt = payload;
			return next();
		}
		// if !algorithm return null
		res.locals.jwt = null;
		return next();
	} catch (error) {
		// on error return null
		res.locals.jwt = null;
		return next();
	}
}

module.exports = authenticateToken;