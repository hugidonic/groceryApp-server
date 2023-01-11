import { Request, Response } from "express";
import UserController from "../../User.controller";

export default async (req: Request, res: Response) => {
	try {
		const userInfo = await UserController.findUserById(req.userId);
		res.status(200).json({id: userInfo.id, username: userInfo.username, email: userInfo.email});
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong...,' });
	}
}