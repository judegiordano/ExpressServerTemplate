import { NextFunction, Request, Response } from "express";

interface IRoute {
	req: Request,
	res: Response,
	next?: NextFunction
}

export default IRoute;