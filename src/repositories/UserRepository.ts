import User from "../models/UserModel";
import IUser from "../types/entities/IUser";
import { ILogin, IRegister, IUpdateEmail } from "../types/IUserActions";
import { compare, hash } from "../helpers/password";

export default class UserRepository {

	public static async Login(login: ILogin): Promise<IUser> {
		try {
			const query = await User.findOne({
				email: login.email,
			});
			if (!query) throw new Error("email not found");

			const hash = await compare(login.password, query.password);
			if (!hash) throw new Error("wrong password");

			return query;
		} catch (e) {
			throw new Error(e);
		}
	}

	public static async Register(register: IRegister): Promise<IUser> {
		try {
			const exists = await User.findOne({
				email: register.email,
			});
			if (exists) throw new Error("email taken");
		} catch (e) {
			throw new Error(e);
		}

		try {
			const tempPass = await hash(register.password);

			const newUser = new User({
				email: register.email,
				password: tempPass,
			});

			return await newUser.save();
		} catch (e) {
			throw new Error(e);
		}
	}

	public static async UpdateEmail(update: IUpdateEmail): Promise<IUser> {
		try {
			const user = await User.findOneAndUpdate({
				$and: [
					{ _id: update.id },
					{ email: update.email },
				]
			}, {
				$set: {
					email: update.newEmail,
					lastUpdated: new Date
				}
			}, { new: false });

			if (user === null || user === undefined) {
				throw new Error("wrong user credentials");
			}
			return user;
		} catch (e) {
			throw new Error(e);
		}
	}
}