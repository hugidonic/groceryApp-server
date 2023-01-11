import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PromoCardType } from '../../User.types';
import PromoCardController from './PromoCard.controller';

export const editPromoCard = async (
	req: Request<{promoId: string}, null, Omit<PromoCardType, 'id'>>,
	res: Response
) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array(), message: "Incorrect data"});
		}
		const editedPromoCard = await PromoCardController.editPromoCardById(req.params.promoId, req.body);
		res
			.status(201)
			.json({ message: 'Promo card edited', payload: editedPromoCard });
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
