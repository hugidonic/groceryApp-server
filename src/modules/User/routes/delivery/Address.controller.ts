import db, { UserDeliveryAddressTable as AddressTable, UserInfoTable } from '../../../../sql';
import { DeliveryAddressType } from '../../User.types';

class AddressController {
	/**
	 * Creates a new delivery address of the user
	 * @param userId id of the user to create delivery address for
	 * @param address the object that goes to database
	 * @returns created delivery address
	 */
	async createDeliveryAddress(
		userId: string,
		address: DeliveryAddressType
	): Promise<DeliveryAddressType> {
		const createdAddress = await db.query(
			`
				INSERT INTO ${AddressTable.table} (${AddressTable.user_id}, ${AddressTable.city}, ${AddressTable.street}, ${AddressTable.house}, ${AddressTable.country}) 
				VALUES ($1, $2, $3, $4, $5) 
				RETURNING *;
      `,
			[ userId, address.city, address.street, address.house, address.country ]
		);
		return createdAddress.rows[0];
	}

	/**
   * gets all delivery addressses of the user by given id
   * @param userId th Id of the authed user
   * @returns {id city street house country}[]
   */
	async getDeliveryAddressesByUserId(userId: string): Promise<DeliveryAddressType[]> {
		const allAddresses = await db.query(
			`
				SELECT ${AddressTable.id}, ${AddressTable.city}, ${AddressTable.street}, ${AddressTable.house}, ${AddressTable.country} 
				FROM ${AddressTable.table} JOIN ${UserInfoTable.table} 
				ON ${AddressTable.user_id} = ${UserInfoTable.id} 
				WHERE ${AddressTable.user_id} = $1;
			`,
			[ userId ]
		);
		return allAddresses.rows;
	}
	/**
   * gets SINGLE delivery addressses of the user by given address id
   * @param addressId th Id of the address
   * @returns {id city street house country}
   */
	async getDeliveryAddressByAddressId(
		addressId: string
	): Promise<DeliveryAddressType> {
		const allAddresses = await db.query(
			`
				SELECT * FROM ${AddressTable.table} WHERE ${AddressTable.id} = $1;
			`,
			[  addressId ]
		);
		return allAddresses.rows[0];
	}

	/**
	 * Edits the delivery address in database
	 * @param addressId the id of the address to edit
	 * @param newAddress New address object to replace the old one
	 * @returns Edited address
	 */
	async editDeliveryAddressById(
		userId: string,
		addressId: string,
		newAddress: Omit<DeliveryAddressType, 'id'>
	): Promise<DeliveryAddressType> {
		const editedAddress = await db.query(
			`
			UPDATE ${AddressTable.table} 
			SET ${AddressTable.city} = $2, ${AddressTable.street} = $3, ${AddressTable.house} = $4, ${AddressTable.country} = $5 
			WHERE ${AddressTable.id}  = $1 AND ${AddressTable.user_id} = $6 
			RETURNING *;
			`,
			[ addressId, newAddress.city, newAddress.street, newAddress.house, newAddress.country, userId ]
		);

		return editedAddress.rows[0];
	}

	/**
   * Deletes a delivery address of the user by given id
   * @param addressId The id of the delivery address to delete 
   * @returns deleted delivery address
   */
	async deleteDeliveryAddressById(addressId: string): Promise<DeliveryAddressType> {
		const deletedAddress = await db.query(
			`
        DELETE FROM ${AddressTable.table} WHERE ${AddressTable.id} = $1 RETURNING *;
      `,
			[ addressId ]
		);
		return deletedAddress.rows[0];
	}
}

export default new AddressController();
