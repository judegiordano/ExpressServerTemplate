import bcrypt from "bcrypt";
import config from "./config";

export const hash = async (string: string): Promise<string> => {
	try {
		const hash = await bcrypt.hash(`${string}${config.SALT}`, 10,);
		return hash;
	} catch (e) {
		throw new Error(e);
	}
};

export const compare = async (pass: string, hash: string): Promise<boolean> => {
	try {
		const valid = await bcrypt.compare(`${pass}${config.SALT}`, hash,);
		return valid;
	} catch (e) {
		throw new Error(e);
	}
};
