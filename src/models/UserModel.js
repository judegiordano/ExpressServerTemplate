const RandomUid = require("../utility/random");

/**
 * New Model For User Entity
 * @param  {String} email Unique User Email
 * @param  {String} password Secure Hashed Password
 */
class User {
	constructor(user) {
		this.guid = user.guid || RandomUid(16);
		this.email = user.email;
		this.password = user.password;
		this.activated = user.activated || false;
		this.created = user.created || new Date();
		this.lastUpdated = user.lastUpdated || new Date();
	}
	data() {
		return {
			guid: this.guid,
			email: this.email,
			password: this.password,
			activated: this.activated,
			created: this.created,
			lastUpdated: this.lastUpdated
		};
	}
}

module.exports = User;