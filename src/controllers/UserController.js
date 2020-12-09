require("dotenv").config;
const pass = require("../utility/password");
const collection = require("../utility/database").connect;

let user;
collection(process.env.COLLECTION).then(r => {
	if (!r) throw new Error("internal server error");
	user = r;
}).catch(e => e);

class UserController {
	async Login (login) {
		const { username, password } = login;
		try {
			const query = await user.findOne({userName: username});
			if(!query) throw new Error("username not found");

			const hash = await pass.compare(password, query.password);
			if (!hash) throw new Error("wrong password");

			return query;
		} catch (e) {
			throw new Error(e);
		}
	};
};

module.exports = UserController;