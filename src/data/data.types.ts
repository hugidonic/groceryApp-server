import { CategoryType } from 'src/modules/Categories';
import { OrderType } from 'src/modules/Orders';
import { ProductType } from 'src/modules/Products';

export type DataType = {
	products: ProductType[];
	categories?: CategoryType[];
  orders?: OrderType[];
};
