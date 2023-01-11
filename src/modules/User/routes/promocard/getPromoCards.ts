import { Request, Response } from 'express';
import PromoCardController from './PromoCard.controller';

export const getPromoCards = async (req: Request, res: Response) => {
	try {
		const userPromoCards = await PromoCardController.getPromoCardsByUserId(req.userId);
		res.status(201).json(userPromoCards);
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
export const getPromoCard = async (req: Request<{promoId: string}>, res: Response) => {
	try {
		const userPromoCard = await PromoCardController.getPromoCardById(req.params.promoId);
		res.status(201).json(userPromoCard);
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
