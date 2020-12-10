const RandomUid = require("../utility/random");

/**
 * New Model For User Entity
 * @param  {String} email Unique User Email
 * @param  {String} password Secure Hashed Password
 */
class User {
	constructor(email, password) {
		this.guid = RandomUid(16);
		this.email = email;
		this.password = password;
		this.activated = false;
		this.created = new Date();
		this.lastUpdated = new Date();
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
	public() {
		return {
			guid: this.guid,
			email: this.email,
			activated: this.activated,
			created: this.created
		};
	}
}

module.exports = User;