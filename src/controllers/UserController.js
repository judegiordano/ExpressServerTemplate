require("dotenv").config;
const pass = require("../utility/password");
const collection = require("../utility/database").connect;

let db;
collection(process.env.COLLECTION).then(r => {
	if (!r) throw new Error("internal server error");
	db = r;
}).catch(e => e);

class UserController {
	async Login(login) {
		const {
			username,
			password
		} = login;

		try {
			const query = await db.findOne({
				userName: username
			});
			if (!query) throw new Error("username not found");

			const hash = await pass.compare(password, query.password);
			if (!hash) throw new Error("wrong password");

			return query;
		} catch (e) {
			throw new Error(e);
		}
	}

	async Register(register) {
		const {
			username,
			password
		} = register;

		try {
			const query = await db.findOne({
				userName: username
			});
			if (query) throw new Error("username taken");
		} catch (e) {
			throw new Error(e);
		}
		try {
			const hash = await pass.hash(password);

			const insert = await db.insertOne({
				userName: username,
				password: hash,
				created: new Date(),
				lastUpdated: new Date(),
				profile: "gray"
			}).then(result => {
				return result.ops[0];
			});

			return insert;
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = UserController;