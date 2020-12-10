const crypto = require("crypto");

function RandomUid(bytes) {
	return crypto.randomBytes(bytes).toString("hex");
}

module.exports = RandomUid;