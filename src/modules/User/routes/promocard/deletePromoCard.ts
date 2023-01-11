import { Request, Response } from 'express';
import PromoCardController from './PromoCard.controller';

export const deletePromoCard = async (
  req: Request<{ promoId: string }>,
  res: Response
) => {
	try {
		const deletedPromo = await PromoCardController.deletePromoCardById(req.params.promoId);
		res.status(201).json({ message: 'Promo deleted successfully', payload: deletedPromo });
	} catch (error) {
		res.status(500).json({ error, message: 'Something went wrong...' });
	}
};
