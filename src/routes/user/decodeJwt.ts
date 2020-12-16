import express, { Request, Response } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response): Response => res.status(200).send(res.locals.jwt));

export default router;