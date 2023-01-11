import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PromoCardType } from '../../User.types';
import PromoCardController from './PromoCard.controller';

export const createPromoCard = async (
	req: Request<null, null, Omit<PromoCardType, 'id'>>,
	res: Response
) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array(), message: "Incorrect data"});
		}
		const createdPromoCard = await PromoCardController.createPromoCard(req.userId, req.body);
		res
			.status(201)
			.json({ message: 'Promo card created successfully', payload: createdPromoCard });
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
