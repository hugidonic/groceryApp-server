import db, { UserPromoCardTable as PromoTable, UserInfoTable } from '../../../../sql';
import { PromoCardType } from '../../User.types';

class PromoCardController {
	/**
	 * Creates a new promo card of the user
	 * @param userId id of the user to create promo card for
	 * @param promoCard the object that goes to database
	 * @returns created promo card
	 */
	async createPromoCard(
		userId: string,
		promoCard: Omit<PromoCardType, 'id'>
	): Promise<PromoCardType> {
		const createdPromo = await db.query(
			`
				INSERT INTO ${PromoTable.table} (${PromoTable.user_id}, ${PromoTable.begin_date}, ${PromoTable.end_date}, ${PromoTable.price}) 
				VALUES ($1, $2, $3, $4) 
				RETURNING *;
      `,
			[ userId, promoCard.beginDate, promoCard.endDate, promoCard.price ]
		);
		return createdPromo.rows[0];
	}

	/**
   * gets all promo cards of the user by given id
   * @param userId th id of the authed user
   * @returns {id beginDate, endDate, price}[]
   */
	async getPromoCardsByUserId(userId: string): Promise<PromoCardType[] | null> {
		const allPromoCards = await db.query(
			`
				SELECT ${PromoTable.id}, ${PromoTable.begin_date}, ${PromoTable.end_date}, ${PromoTable.price}
				FROM ${PromoTable.table} JOIN ${UserInfoTable.table} 
				ON ${PromoTable.user_id} = ${UserInfoTable.id} 
				WHERE ${PromoTable.user_id} = $1;
			`,
			[ userId ]
		);
		return allPromoCards.rows;
	}
	/**
   * gets single promo card of the user by given promo Id
   * @param promoId the id of the single promo card
   * @returns {id beginDate, endDate, price}
   */
	async getPromoCardById(promoId: string): Promise<PromoCardType[] | null> {
		const allPromoCards = await db.query(
			`
				SELECT * FROM ${PromoTable.table} WHERE ${PromoTable.id} = $1;
			`,
			[ promoId ]
		);
		return allPromoCards.rows;
	}

	/**
	 * Edits the promo card in database
	 * @param promoId the id of the promocard to edit
	 * @param newPromoCard New promo card object to replace the old one
	 * @returns Edited Promo card
	 */
	async editPromoCardById(
		promoId: string,
		newPromoCard: Omit<PromoCardType, 'id'>
	): Promise<PromoCardType> {
		const editedPromo = await db.query(
			`
			UPDATE ${PromoTable.table} 
			SET ${PromoTable.begin_date} = $2, ${PromoTable.end_date} = $3, ${PromoTable.price} = $4 
			WHERE ${PromoTable.id} = $1  
			RETURNING *;
			`,
			[ promoId, newPromoCard.beginDate, newPromoCard.endDate, newPromoCard.price ]
		);

		return editedPromo.rows[0];
	}

	/**
   * Deletes a promo card of the user by given id
   * @param promoId The id of the promo card to delete 
   * @returns deleted promo card
   */
	async deletePromoCardById(promoId: string): Promise<PromoCardType> {
		const deletedPromo = await db.query(
			`
        DELETE FROM ${PromoTable.table} WHERE ${PromoTable.id} = $1 RETURNING *;
      `,
			[ promoId ]
		);
		return deletedPromo.rows[0];
	}
}

export default new PromoCardController();
