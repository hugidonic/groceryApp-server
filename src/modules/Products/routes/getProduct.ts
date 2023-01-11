import { Request, Response } from 'express';
import { getImageUri } from '../../../utils';
import ProductsController from '../Products.controller';
import { ProductType } from '../Products.types';

export const getProduct = async (req: Request<{ productId: string }>, res: Response) => {
	try {
		const productFromDb = await ProductsController.getProductById(req.params.productId);
		const product: ProductType = {
			...productFromDb,
			pictureUri: getImageUri(productFromDb.name)
		};
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
