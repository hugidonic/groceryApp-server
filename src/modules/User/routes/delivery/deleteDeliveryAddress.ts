import { Request, Response } from 'express';
import AddressController from './Address.controller';

export const deleteDeliveryAddress = async (req: Request<{addressId: string}>, res: Response) => {
	try {
		const deletedAddress = await AddressController.deleteDeliveryAddressById(req.params.addressId);
		return res
			.status(200)
			.json({ message: 'Delivery address deleted', payload: deletedAddress });
	} catch (errors) {
		res.status(500).json({ error: 'Something went wrong...' });
	}
};
