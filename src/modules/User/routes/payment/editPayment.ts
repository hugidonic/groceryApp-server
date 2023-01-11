// Express
import { Request, Response } from 'express';
import { PaymentMethodType } from '../../User.types';
import PaymentController from './Payment.controller';
import { validationResult } from 'express-validator';

// TODO: Request body should be without id
export const editPayment = async (
	req: Request<{ paymentId: string }, PaymentMethodType, PaymentMethodType>,
  res: Response
) => {
  try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array(), message: "Incorrect data"});
		}
		const newPayment = req.body;
		const editedPayment = await PaymentController.editPaymentMethodById(req.params.paymentId, newPayment);
		res.status(200).json({ message: 'Payment edited successfully', payload: editedPayment });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong...' });
  }
}