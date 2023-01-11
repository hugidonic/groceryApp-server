import { Request, Response } from 'express';
import CategoriesController from '../Categories.controller';

export const deleteCategory = async (
	req: Request<{ categoryId: string }>,
	res: Response
) => {
	try {
		const deletedCategory = await CategoriesController.deleteCategoryById(req.params.categoryId);
		res.status(200).json({message: "Category deleted successfully", payload: deletedCategory});
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...'});
	}
};
