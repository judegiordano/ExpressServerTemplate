interface IUser {
	_id: string,
	email: string
	password: string,
	activated: boolean,
	created: Date,
	lastUpdated: Date
}

export default IUser;