export interface ILogin {
	email: string,
	password: string
}

export interface IRegister {
	email: string,
	password: string
}

export interface IUpdateEmail {
	id: string,
	email: string,
	newEmail: string
}