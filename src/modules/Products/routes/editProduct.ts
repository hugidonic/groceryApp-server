import { Request, Response } from 'express';
import ProductsController from '../Products.controller';
import { ProductType, RequestBodyProduct } from '../Products.types';

export const editProduct = async (
	req: Request<{ productId: string }, ProductType, RequestBodyProduct>,
	res: Response
) => {
	try {
		const product = await ProductsController.editProduct(req.params.productId, req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
