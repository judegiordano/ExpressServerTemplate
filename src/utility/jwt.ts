import jwt from "jsonwebtoken";
import config from "./config";
import { IJWT, IJwtPayload } from "../types/IJWT";

import dateFormat from "dateformat";

const { JWT_SECRET } = config;

export const sign = async (payload: IJwtPayload): Promise<string> => {
	try {
		return jwt.sign(payload, JWT_SECRET, {
			expiresIn: "7d"
		});

	} catch (e) {
		throw new Error(e);
	}
};

export const verify = async (token: string): Promise<IJWT> => {
	try {
		const data = jwt.verify(token, JWT_SECRET) as IJWT;
		return {
			_id: data._id,
			created: data.created,
			activated: data.activated,
			email: data.email,
			iat: data.iat,
			exp: data.exp,
			issued: dateFormat(new Date(parseInt(data.iat) * 1000), "yyyy-mm-dd h:MM:ss"),
			expires: dateFormat(new Date(parseInt(data.exp) * 1000), "yyyy-mm-dd h:MM:ss")
		} as IJWT;
	} catch (e) {
		throw new Error(e);
	}
};
