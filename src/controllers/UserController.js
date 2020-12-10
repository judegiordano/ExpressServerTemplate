require("dotenv").config;
const pass = require("../utility/password");
const collection = require("../utility/database").connect;
const User = require("../models/UserModel");

let db;
collection(process.env.COLLECTION).then(r => {
	if (!r) throw new Error("internal server error");
	db = r;
}).catch(e => e);

class UserController {
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

			return query;
		} catch (e) {
			throw new Error(e);
		}
	}

	async Register(register) {
		const {
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
			const hash = await pass.hash(password);

			const newUser = new User(email, hash);

			const insert = await db.insertOne(newUser.data())
				.then(result => {
					return result.ops[0];
				});

			return insert;
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = UserController;