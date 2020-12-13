const pass = require("../utility/password");
const User = require("../models/UserModel");

class UserController {

	async Login(login) {
		const {
			email,
			password
		} = login;

		try {
			const query = await User.findOne({
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
		let {
			email,
			password
		} = register;

		try {
			const exists = await User.findOne({
				email: email
			});
			if (exists) throw new Error("email taken");
		} catch (e) {
			throw new Error(e);
		}

		try {
			const tempPass = await pass.hash(password);

			const newUser = new User({
				email: email,
				password: tempPass
			});

			return await newUser.save();
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = UserController;