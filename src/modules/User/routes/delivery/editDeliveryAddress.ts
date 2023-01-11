import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DeliveryAddressType } from '../../User.types';
import AddressController from './Address.controller';

/**
 * Edits an existing address in database
 * @param req The request object containing addressId param 
 * @param res Contains new address body 
 */
export const editDeliveryAddress = async (
	req: Request<{ addressId: string }, null, Omit<DeliveryAddressType, 'id'>>,
	res: Response
) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array(), message: "Incorrect data"});
		}
		const newAddress = req.body;
		const editedAddress = await AddressController.editDeliveryAddressById(req.userId, req.params.addressId, newAddress);
		res.status(200).json({ message: 'Address edited successfully', payload: editedAddress });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong...' });
	}
};
