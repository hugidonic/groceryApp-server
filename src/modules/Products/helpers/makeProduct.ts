import fs from 'fs';
import { ProductType } from '../Products.types';

export const makeProduct = (newProduct: ProductType, callback: (err: any) => void) => {
	const previousProducts: ProductType[] = JSON.parse(
		fs.readFileSync('./json/newProducts.json', 'utf8')
	);
	const newProducts: ProductType[] = [
		...previousProducts, newProduct
	];

	fs.writeFile('./json/newProducts.json', JSON.stringify(newProducts), (err) =>
		callback(err)
	);
};
