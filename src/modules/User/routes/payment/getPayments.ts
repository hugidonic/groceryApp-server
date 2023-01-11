// Express
import { Request, Response } from 'express';
// Controller
import PaymentController from './Payment.controller';

export const getPayments = async (req: Request, res: Response) => {
	try {
		const userPayments = await PaymentController.getPaymentMethodsByUserId(req.userId);
		return res.status(200).json(userPayments);
	} catch (errors) {
		res.status(500).json({ error: 'Something went wrong...,' });
	}
};
export const getPayment = async (req: Request<{paymentId: string}>, res: Response) => {
	try {
		const userPayment = await PaymentController.getPaymentMethodById(req.params.paymentId) || null;
		return res.status(200).json(userPayment);
	} catch (errors) {
		res.status(500).json({ error: 'Something went wrong...,' });
	}
};
