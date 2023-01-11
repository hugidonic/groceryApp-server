// Express
import { Request, Response } from 'express';
// Controller
import AddressController from './Address.controller';

export const getDeliveryAddresses = async (req: Request, res: Response) => {
	try {
		const userAddresses = await AddressController.getDeliveryAddressesByUserId(req.userId);
		return res.status(200).json(userAddresses);
	} catch (errors) {
		res.status(500).json({ error: 'Something went wrong...,' });
	}
};

export const getDeliveryAddress = async (req: Request<{addressId:string}>, res: Response) => {
	try {
		const userAddresses = await AddressController.getDeliveryAddressByAddressId(req.params.addressId);
		return res.status(200).json(userAddresses);
	} catch (errors) {
		res.status(500).json({ error: 'Something went wrong...,' });
	}
}