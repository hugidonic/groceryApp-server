import { Request, Response } from 'express';
// Controller
import PaymentController from './Payment.controller';

export const deletePayment = async (
	req: Request<{ paymentId: string }>,
	res: Response
) => {
	try {
		const deletedPayment = await PaymentController.deletePaymentMethodById(req.params.paymentId);
		return res.status(200).json({ message: 'Payment method deleted', payload: deletedPayment });
	} catch (errors) {
		res.status(500).json({ error: 'Something went wrong...,' });
	}
};
