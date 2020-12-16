interface IJWT {
	_id: string,
	created: Date,
	activated: boolean,
	email: string,
	iat: string,
	exp: string,
	issued: string,
	expires: string
}

export default IJWT;