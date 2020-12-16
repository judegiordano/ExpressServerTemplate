import { NextFunction, Request, Response } from "express";

interface IRoute {
	req: Request,
	res: Response,
	next?: NextFunction
}
export interface IError {
	ok: boolean,
	error: string
}

export default IRoute;