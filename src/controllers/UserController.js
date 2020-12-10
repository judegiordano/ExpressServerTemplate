require("dotenv").config;
const pass = require("../utility/password");
const collection = require("../utility/database");
const User = require("../models/UserModel");

// open database connection pooling
let db;
try {
	collection(process.env.COLLECTION).then(context => {
		return db = context;
	});
} catch (e) {
	throw new Error(e);
}

class UserController {
	// should the given credentials log in
	async Login(login) {
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

	// should a new user be registered
	async Register(register) {
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