// Express
import { Request, Response } from 'express';
// Types
import { PaymentMethodType } from '../../User.types';
// Controller
import PaymentController from './Payment.controller';
import { validationResult } from 'express-validator';

export const createPayment = async (req: Request<null, null, PaymentMethodType>, res: Response) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array(), message: "Incorrect data"});
		}
		const createdPayment = await PaymentController.createPaymentMethod(req.userId, req.body);
		return res.status(200).json({ message: 'Payment method successfully created', payload: createdPayment });
	} catch (err) {
		res.status(500).json({ err, error: 'Something went wrong...,' });
	}
};
