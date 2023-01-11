import { Request, Response } from 'express';
import ProductsController from '../Products.controller';
import { ProductType } from '../Products.types';

export const deleteProduct = async (
	req: Request<{ productId: string }>,
	res: Response<{message: string, payload?: ProductType, error?: any}>
) => {
	try {
		const deletedProduct = await ProductsController.deleteProduct(req.params.productId);
		res.status(200).json({message: "Product deleted successfully", payload: deletedProduct});
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...'});
	}
};
