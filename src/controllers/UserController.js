require("dotenv").config;
const pass = require("../utility/password");
const User = require("../models/UserModel");

class UserController {
	constructor(dbContext) {
		this.dbContext = dbContext;
	}

	async Login(login) {
		const db = this.dbContext;
		const {
			email,
			password
		} = login;

		try {
			const query = await db.findOne({
				email: email
			});
			if (!query) throw new Error("email not found");

			const hash = await pass.compare(password, query.password);
			if (!hash) throw new Error("wrong password");

			const loggedIn = new User(query);
			return loggedIn.data();
		} catch (e) {
			throw new Error(e);
		}
	}

	async Register(register) {
		const db = this.dbContext;
		let {
			email,
			password
		} = register;

		try {
			const query = await db.findOne({
				email: email
			});
			if (query) throw new Error("email taken");
		} catch (e) {
			throw new Error(e);
		}

		try {
			const tempPass = await pass.hash(password);

			const newUser = new User({
				email: email,
				password: tempPass
			});

			await db.insertOne(newUser.data());
			return newUser.data();
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = UserController;