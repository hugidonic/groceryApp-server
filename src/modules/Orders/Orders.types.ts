import { ProductType } from '../Products';
import { DeliveryAddressType, PaymentMethodType } from '../User';

// 								FROM DATABASE

// Order Type that comes from the database
export interface RawOrderType {
	/**
	 * Id of the order
	 */
	id: string;
	/**
	* Date the order was created
	*/
	created_at: string;
	/**
	* Price of the order
	*/
	price: number;
	/**
	* is the order Finished or active
	*/
	type: 'active' | 'finished';
	/**
	* Products of the order
	*/
	cart_products: string | CartItemType[];
	/**
	* Delivery address id from users info
	*/
	delivery_address_id: string;
	/**
	* Choosen user's id payment method 
	*/
	payment_method_id: string;
}
// Cart item type that comes from the database
export interface RawCartItemType extends Omit<ProductType, 'richDescription'> {
	count: number;
	rich_description: string;
}

// 	 	 			TO CLIENT

// Order type that goes to client
export interface OrderType
	extends Omit<
			RawOrderType,
			'cart_products' | 'delivery_address_id' | 'payment_method_id' | 'created_at'
		> {
	cartItems: CartItemType[];
	deliveryAddress: DeliveryAddressType;
	paymentMethod: PaymentMethodType;
	createdAt: string;
}

// Cart Item type that goes to client
export type CartItemType = {
	product: ProductType;
	count: number;
};

// 					FROM CLIENT
// Order Type that comes from client
export type RequestOrderType = {
	createdAt: OrderType['createdAt'];
	price: OrderType['price'];
	type: OrderType['type'];
	
	deliveryAddressId: number;
	paymentMethodId: number;
	cartItems: { productId: ProductType['id']; count: number }[];
};
