import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DeliveryAddressType } from '../../User.types';
import AddressController from './Address.controller';

export const createDeliveryAddress = async (
	req: Request<null, null, DeliveryAddressType>,
	res: Response
) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array(), message: "Incorrect data"});
		}
		const address = req.body;
		const createdAddress = await AddressController.createDeliveryAddress(req.userId, address);
		res.status(200).json({ message: 'Address created successfully', payload: createdAddress });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong...' });
	}
};
