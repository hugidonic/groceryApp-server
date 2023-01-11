import { ImagesNamespaceType } from "../../data/constants";

export type CategoryType = {
	id: string;
	name: ImagesNamespaceType;
	// ? TODO: remove color
	color: string;
	pictureUri: string;
};

export type CategoryFromDBType = Omit<CategoryType, 'pictureUri'>
export type RequestCategoryBodyType = Omit<CategoryType, 'pictureUri' | 'id'>
