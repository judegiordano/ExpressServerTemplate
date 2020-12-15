import jwt from "jsonwebtoken";
import config from "./config";
import IPayload from "../types/IPayload";

export const sign = async (payload: IPayload): Promise<string> => {
	try {
		return jwt.sign(payload, config.JWT_SECRET, {
			expiresIn: 60 // one minute
		});
	} catch (e) {
		throw new Error(e);
	}
};

export const verify = async (token: string): Promise<string | unknown> => {
	try {
		return jwt.verify(token, config.JWT_SECRET);
	} catch (error) {
		throw new Error(error);
	}
};
