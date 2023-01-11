import { Request, Response } from 'express';
import { getImageUri } from '../../../utils';
import CategoriesController from '../Categories.controller';
import { CategoryType } from '../Categories.types';

export const getCategory = async (req: Request<{ categoryId: string }>, res: Response) => {
	try {
		const categoryFromDb = await CategoriesController.getCategoryById(req.params.categoryId);
		const category: CategoryType = {
			...categoryFromDb,
			pictureUri: getImageUri(categoryFromDb.name)
		};
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
