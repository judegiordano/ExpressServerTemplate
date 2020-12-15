import { Request, Response } from "express";

interface IRoute {
	req: Request,
	res: Response
}

export default IRoute;