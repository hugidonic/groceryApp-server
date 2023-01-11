export type UserInfoType = {
	details: {
		name: string;
		email: string;
	};
	deliveryAddresses: DeliveryAddressType[];
	paymentMethods: PaymentMethodType[];
};

export type UserType = {
	id: string;
	username: string;
	email: string;
	hashedpassword: string;
};

export type LoginRequestBodyType = {
	email: string;
	password: string;
};

export type RegisterRequestBodyType = {
	username: string;
	email: string;
	password: string;
};

export type DeliveryAddressType = {
	id: string;
	city: string;
	street: string;
	house: string;
	country: string;
};

export type PromoCardType = {
	id: string;
	beginDate: string;
	endDate: string;
	price: number;
};

export type PaymentMethodType = {
	id: string;
	cardNumber: string;
	cardName: string;
};
