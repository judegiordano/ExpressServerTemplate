require("dotenv").config();
const jwt = require("jsonwebtoken");

const sign = async (payload) => {
	return new Promise((resolve, reject) => {
		return resolve(jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:
			60 // one minute
		})).catch(e => reject(e));
	});
};

const verify = async (token) => {
	return new Promise((resolve, reject) => {
		return resolve(jwt.verify(token, process.env.JWT_SECRET)).catch(e => reject(e));
	});
};

module.exports = {
	sign,
	verify	
};