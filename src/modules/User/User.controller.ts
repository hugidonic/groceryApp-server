import db, { UserInfoTable } from '../../sql';
import { UserType } from './User.types';

class User {
	/**
   * Creates a new user in the database using the given username email and hashed password
   */
	async createUser(username: string, email: string, password: string): Promise<UserType> {
		const newUser = await db.query<
			UserType
		>(
			`INSERT INTO ${UserInfoTable.table} (${UserInfoTable.username}, ${UserInfoTable.email}, ${UserInfoTable.hashedPassword}) VALUES ($1, $2, $3) RETURNING *`,
			[ username, email, password ]
		);
		return newUser.rows[0] as UserType;
	}
	/**
   * Deletes a user from the database
   * @param id Id of the user in database
   */
	async deleteUserById(id: string) {
		await db.query(`DELETE FROM ${UserInfoTable.table} WHERE ${UserInfoTable.id} = $1`, [ id ]);
	}

	/**
   * Finds a user in the database using email and returns user details
   * @param email email of the user to search for
   * @returns Found user object
   */
	async findUserByEmail(email: string): Promise<UserType> {
		const candidate = await db.query<
			UserType
		>(`SELECT * FROM ${UserInfoTable.table} WHERE ${UserInfoTable.email} = $1`, [ email ]);
		return candidate.rows[0];
	}
	/**
   * Finds a user in the database using ID and returns user details
   */
	async findUserById(userId: string): Promise<UserType> {
		const candidate = await db.query<
			UserType
		>(`SELECT * FROM ${UserInfoTable.table} WHERE ${UserInfoTable.id} = $1`, [ userId ]);
		return candidate.rows[0];
	}
}

export default new User();
