import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import IUser from "../types/entities/IUserData";

const User = new mongoose.Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		activated: {
			type: Boolean,
			default: false
		},
		created: {
			type: Date,
			default: Date.now()
		},
		lastUpdated: {
			type: Date,
			default: Date.now()
		},
	},
	{
		collection: "User",
		versionKey: false
	}
);

export default mongoose.model<IUser>("User", User);
