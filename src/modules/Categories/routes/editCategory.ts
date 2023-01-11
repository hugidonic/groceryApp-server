import { Request, Response } from 'express';
import CategoriesController from '../Categories.controller';
import { CategoryType, RequestCategoryBodyType } from '../Categories.types';

export const editCategory = async (
	req: Request<{ categoryId: string }, CategoryType, RequestCategoryBodyType>,
	res: Response
) => {
	try {
		const editedCategory = await CategoriesController.editCategory(req.params.categoryId, req.body);
		res.status(200).json(editedCategory);
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
