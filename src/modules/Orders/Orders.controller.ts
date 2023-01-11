import {
	CartItemType,
	OrderType,
	RequestOrderType,
	RawOrderType,
	RawCartItemType
} from './Orders.types';
import db, { UserOrderTable as OrderTable } from '../../sql';
import AddressController from '../User/routes/delivery/Address.controller';
import PaymentController from '../User/routes/payment/Payment.controller';

class OrdersController {
	private async transformFromRaw(raw: RawOrderType): Promise<OrderType> {
		const cartItems = await this.getCartItemsFromOrder(raw.id);
		const address = await AddressController.getDeliveryAddressByAddressId(
			raw.delivery_address_id
		);
		const payment = await PaymentController.getPaymentMethodById(raw.delivery_address_id);
		return {
			id: raw.id,
			createdAt: raw.created_at,
			price: raw.price,
			cartItems,
			type: raw.type,
			deliveryAddress: address,
			paymentMethod: payment
		};
	}

	async createOrder(userId: string, newOrder: RequestOrderType): Promise<void> {
		// [ '"(4,1)" ', ' "(4,1)" ']
		const cartItemsString: string[] = newOrder.cartItems.map(
			(cartItem) => `"(${cartItem.count}, ${cartItem.productId})"`
		);
		// {"(4,1)","(3,4)"}
		const cartProducts: string = `{${cartItemsString.toString()}}`;

		const createdOrder = (await db.query<RawOrderType>(
			`
      INSERT INTO ${OrderTable.table} (${OrderTable.user_id}, ${OrderTable.delivery_address_id}, ${OrderTable.payment_method_id}, ${OrderTable.cart_products}, ${OrderTable.created_at}, ${OrderTable.price}, ${OrderTable.type})
      VALUES ($1, $2, $3, $4, $5, $6, 'active')
      RETURNING *;
    `,
			[
				userId,
				newOrder.deliveryAddressId,
				newOrder.paymentMethodId,
				cartProducts,
				newOrder.createdAt,
				newOrder.price
			]
		)).rows[0];
	}

	async getAllOrdersByUserId(userId: string): Promise<OrderType[]> {
		const requestedOrders = (await db.query<
			RawOrderType
			>(`SELECT * from ${OrderTable.table} WHERE user_id = $1`, [ userId ])).rows;
		

		const allOrders: OrderType[] = await Promise.all(
			requestedOrders.map(async (order) => {
				return await this.transformFromRaw(order);
			})
		);
		console.log('allOrders', allOrders);

		return allOrders;
	}

	async getOrderById(orderId: string): Promise<OrderType> {
		const order: RawOrderType = (await db.query<
			RawOrderType
		>(`SELECT * from ${OrderTable.table} WHERE ${OrderTable.id} = $1`, [ orderId ])).rows[0];

		return { ...await this.transformFromRaw(order) };
	}

	async getCartItemsFromOrder(orderId: string): Promise<CartItemType[]> {
		await db.query(
			`
			CREATE TEMP TABLE IF NOT EXISTS order_products AS SELECT unnest(get_products_from(cart_products)) as "prods" FROM user_order WHERE user_order.id = 5;
			`,
			[]
		);
		const productsFromOrder: RawCartItemType[] = (await db.query<RawCartItemType>(
			`
				SELECT
					(prods).count as "count",
					(prods).product.id as "id",
					(prods).product.name as "name",
					(prods).product.type as "type",
					(prods).product.description as "description",
					(prods).product.rich_description as "rich_description",
					(prods).product.price as "price"
				FROM order_products;
			`
		)).rows;

		const cartItems: CartItemType[] = productsFromOrder.map((prod) => {
			return {
				count: prod.count,
				product: {
					id: prod.id,
					name: prod.name,
					type: prod.type,
					pictureUri: prod.pictureUri,
					description: prod.description,
					richDescription: prod.rich_description,
					price: prod.price
				}
			};
		});
		console.log('cartItems', cartItems)
		return cartItems;
	}
	// async editOrderById(userId: string, orderId: string): Promise<OrderType>  {}
	// async deleteOrderById(orderId: string): Promise<OrderType>  {}

	async clearTable() {
		await db.query(`TRUNCATE TABLE ${OrderTable.table}`);
	}
}

export default new OrdersController();
