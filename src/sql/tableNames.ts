const UserOrderTable = {
	table: 'user_order',
	id: '',
  user_id: 'user_id',
  delivery_address_id: 'delivery_address_id',
  payment_method_id : 'payment_method_id',
	cart_products: 'cart_products',
  
  created_at : 'created_at',
  price: 'price',
  type: 'type',
}

const UserPromoCardTable = {
	table: 'user_promo_cards',
	id: '',
	user_id: 'user_id',
	begin_date: 'begin_date',
	end_date: 'end_date',
	price: 'price'
};

const UserPaymentMethodTable = {
	table: 'user_payment_method',
	id: '',
	user_id: 'user_id',
	card_number: 'card_number',
	card_name: 'card_name'
};

const UserDeliveryAddressTable = {
	table: 'user_delivery_address',
	id: '',
	user_id: 'user_id',
	city: 'city',
	street: 'street',
	house: 'house',
	country: 'country'
};

const UserInfoTable = {
	table: 'user_info',
	id: '',
	username: 'username',
	email: 'email',
	hashedPassword: 'hashedPassword'
};

const ProductTable = {
	table: 'product',
	id: '',
	name: 'name',
	type: 'type',
	description: 'description',
	richDescription: 'rich_description',
	price: 'price'
};

const CategoryTable = {
	table: 'category',
	id: '',
	name: 'name',
	color: 'color'
}

// adding table id's
UserInfoTable.id = `${UserInfoTable.table}.id`;
ProductTable.id = `${ProductTable.table}.id`;
UserDeliveryAddressTable.id = `${UserDeliveryAddressTable.table}.id`;
UserPaymentMethodTable.id = `${UserPaymentMethodTable.table}.id`;
UserPromoCardTable.id = `${UserPromoCardTable.table}.id`;
CategoryTable.id = `${CategoryTable.table}.id`;
UserOrderTable.id = `${UserOrderTable.table}.id`;

export {
	UserInfoTable,
	ProductTable,
	UserDeliveryAddressTable,
	UserPaymentMethodTable,
	UserPromoCardTable,
	CategoryTable,
	UserOrderTable
};
