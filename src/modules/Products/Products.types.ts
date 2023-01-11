import { ImagesNamespaceType } from "../../data/constants";

export type ProductType = {
	/**
	 * Id of the product
	 */
	id: string;
	/**
	 * Name of the product (useful for naming images)
	 */
	name: ImagesNamespaceType;
	/**
	 * Type of the product
	 */
	type: 'fruit' | 'vegetable';
	/**
	 * Description of the product
	 */
	description: string;
	richDescription?: string;
	/**
	 * Price
	 */
	price: number;
	/**
	 * Picture uri (for example: https:localhost/api/images/Apples.png)
	 */
	pictureUri: string
};

export  type RequestBodyProduct = Omit<ProductType, 'id' | 'pictureUri'>;

export type ProductTypeFromDB = {
	id: string;
	name: ImagesNamespaceType;
	type: 'fruit' | 'vegetable';
	description: string;
	rich_description?: string;
	price: number;
	pictureUri: string
}

