class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.activated = false;
		this.created = new Date();
		this.lastUpdated = new Date();
	}
	data() {
		return {
			email: this.email,
			password: this.password,
			activated: this.activated,
			created: this.created,
			lastUpdated: this.lastUpdated
		};
	}
}

module.exports = User;