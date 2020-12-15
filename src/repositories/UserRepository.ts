import { hash, compare } from "@util/password";
import User from "../models/UserModel";
import ILogin from "../types/ILogin";
import IUser from "../types/IUserData";

export default class UserRepository {

	async Login(login: ILogin): Promise<IUser> {
		const { email, password } = login;

		try {
			const query = await User.findOne({
				email: email,
			});
			if (!query) throw new Error("email not found");

			const hash = await compare(password, query.password);
			if (!hash) throw new Error("wrong password");

			return query;
		} catch (e) {
			throw new Error(e);
		}
	}

	async Register(register: ILogin): Promise<IUser> {
		const { email, password } = register;

		try {
			const exists = await User.findOne({
				email: email,
			});
			if (exists) throw new Error("email taken");
		} catch (e) {
			throw new Error(e);
		}

		try {
			const tempPass = await hash(password);

			const newUser = new User({
				email: email,
				password: tempPass,
			});

			return await newUser.save();
		} catch (e) {
			throw new Error(e);
		}
	}
}