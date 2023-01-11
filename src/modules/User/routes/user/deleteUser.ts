import { Request, Response } from "express";
import UserController from "../../User.controller";

export default async (req: Request, res: Response) => {
	try {
		const deletedUser = await UserController.deleteUserById(req.params.id);
		return res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error('err:', error);
	}
}