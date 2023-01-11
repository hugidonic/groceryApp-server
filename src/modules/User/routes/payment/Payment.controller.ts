import { PaymentMethodType } from '../../User.types';
import db, { UserInfoTable, UserPaymentMethodTable as PaymentTable } from '../../../../sql';

class PaymentController {
	/**
   * Creates a new payment method of the user
   * @param userId id of the user to create payment for
   * @param paymentMethod the object that goes to database
   * @returns created payment method
   */
	async createPaymentMethod(userId: string, paymentMethod: PaymentMethodType): Promise<PaymentMethodType> {
		const createdPaymentMethod = await db.query(
			`
      INSERT INTO ${PaymentTable.table} (${PaymentTable.user_id}, ${PaymentTable.card_number}, ${PaymentTable.card_name})
			VALUES ($1, $2, $3) RETURNING *;
      `,
			[ userId, paymentMethod.cardNumber, paymentMethod.cardName ]
			);

		return createdPaymentMethod.rows[0];
	}

	/**
   * gets all payment methods of the user by given id
   * @param userId th Id of the authed user
   * @returns {card_number, card_name}[]
   */
	async getPaymentMethodsByUserId(userId: string): Promise<PaymentMethodType[]> {
		const allPaymentMethods = await db.query<PaymentMethodType>(
			`
      SELECT ${PaymentTable.id}, ${PaymentTable.card_name} AS "cardName", ${PaymentTable.card_number} AS "cardNumber" 
      FROM ${PaymentTable.table} JOIN ${UserInfoTable.table} ON ${PaymentTable.user_id} = ${UserInfoTable.id} 
      WHERE ${PaymentTable.user_id} = $1;
		`,
			[ userId ]
		);

		return allPaymentMethods.rows;
	}
	/**
   * gets single payment method of the user by given payment ID
   * @param paymentId th Id of the payment card
   * @returns {card_number, card_name}
   */
	async getPaymentMethodById(paymentId: string): Promise<PaymentMethodType> {
		const allPaymentMethods = await db.query<PaymentMethodType>(
			`
				SELECT * FROM ${PaymentTable.table} WHERE ${PaymentTable.id} = $1;
			`,
			[ paymentId ]
		);

		return allPaymentMethods.rows[0];
	}

	/**
	 * Edits the payment method in database by given paymentId
	 * @param paymentId the id of the payment to edit
	 * @param newPayment New payment object to replace the old one
	 * @returns Edited payment 
	 */
	async editPaymentMethodById(
		paymentId: string,
		newPayment: Omit<PaymentMethodType, 'id'>
	): Promise<PaymentMethodType> {
		const editedPayment = await db.query(
			`
				UPDATE ${PaymentTable.table} 
				SET ${PaymentTable.card_name} = $2, ${PaymentTable.card_number} = $3 
				WHERE ${PaymentTable.id} = $1 
				RETURNING *;
			`,
			[ paymentId, newPayment.cardName, newPayment.cardNumber ]
		);

		return editedPayment.rows[0];
	}

	/**
   * Deletes a payment method of the user by given id
   * @param paymentId The id of the payment to delete 
   * @returns deleted payment method
   */
	async deletePaymentMethodById(paymentId: string): Promise<boolean> {
		const deletedPaymentMethod = await db.query(
			`
        DELETE FROM ${PaymentTable.table} WHERE ${PaymentTable.id} = $1 RETURNING *;
      `,
			[ paymentId ]
		);
		return deletedPaymentMethod.rows[0];
	}
}

export default new PaymentController();
