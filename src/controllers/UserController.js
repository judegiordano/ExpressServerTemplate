require("dotenv").config;
const pass = require("../utility/password");
const collection = require("../utility/database");
const User = require("../models/UserModel");

// open database connection pooling
let db;
try {
	// open collection matching env
	collection(process.env.COLLECTION).then(context => {
		// reassign local db context
		return db = context;
	});
} catch (e) {
	throw new Error(e);
}

class UserController {
	// should the given credentials log in
	async Login(login) {
		// get from request body
		const {
			email,
			password
		} = login;

		try {
			// check if user exists
			const query = await db.findOne({
				email: email
			});
			// if not found, throw
			if (!query) throw new Error("email not found");

			// compare db hash to requested password
			const hash = await pass.compare(password, query.password);
			if (!hash) throw new Error("wrong password");

			const loggedIn = new User(query);
			// return user data JSON
			return loggedIn.data();
		} catch (e) {
			throw new Error(e);
		}
	}

	// should a new user be registered
	async Register(register) {
		// get from request body
		let {
			email,
			password
		} = register;

		try {
			// check if email taken
			const query = await db.findOne({
				email: email
			});
			// if exists, throw
			if (query) throw new Error("email taken");
		} catch (e) {
			throw new Error(e);
		}

		try {
			// hash password
			const tempPass = await pass.hash(password);

			// new user entity
			const newUser = new User({
				email: email,
				password: tempPass
			});

			// insert one by returned JSON
			await db.insertOne(newUser.data());

			// return new user JSON
			return newUser.data();
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = UserController;