// Filereader
import fs from 'fs';
// Utils
import { uuid, getImageUri } from '../utils';
// Constants
import { categoryNames, colors, fruitNames, vegatableNames, allProductNames } from './constants';
// Types
import { DataType } from './data.types';

const data: DataType = {
	products: allProductNames.map((productName) => {
		return {
			id: uuid(),
			name: productName,
			//@ts-ignore
			type: vegatableNames.includes(productName) ? 'vegetable' : 'fruit',
			description: 'Organic',
			richDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			price: 4.99,
			pictureUri: getImageUri(productName)
		};
	}),
	categories: categoryNames.map((categoryName, idx) => {
		return {
			id: uuid(),
			name: categoryName,
			color: colors[idx],
			pictureUri: getImageUri(categoryName)
		};
	})
};

const dataJson = JSON.stringify(data);

fs.writeFileSync('json/data.json', dataJson);

export { data };
