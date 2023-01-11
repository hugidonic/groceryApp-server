import db, { CategoryTable } from '../../sql';
import { CategoryFromDBType, RequestCategoryBodyType } from './Categories.types';

class CategoriesController {
		/**
   * Creates a new category object in database without image
   * @param category the body of the request object containing the category information
   * @returns {CategoryFromDBType}
   */
	async createCategory(category: RequestCategoryBodyType): Promise<CategoryFromDBType> {
		const createdCategory = await db.query<
			CategoryFromDBType
		>(
			`INSERT INTO ${CategoryTable.table} (${CategoryTable.name}, ${CategoryTable.color}) VALUES ($1, $2) RETURNING *;`,
			[ category.name, category.color ]
		);

		return createdCategory.rows[0];
	}
		/**
   * gets all categories from database
   * @returns {CategoryFromDBType[]}
   */
	async getAllCatgories(): Promise<CategoryFromDBType[]> {
		const categories = await db.query<CategoryFromDBType>(
			`SELECT * FROM ${CategoryTable.table};`
		);

		return categories.rows;
	}
	/**
   * gets SINGLE category by given category id
   * @param categoryId th Id of the category to get
   * @returns {CategoryFromDBType}
   */
	async getCategoryById(categoryId: string): Promise<CategoryFromDBType> {
		const requestedCategory = await db.query<
			CategoryFromDBType
		>(`SELECT * FROM ${CategoryTable.table} WHERE ${CategoryTable.id} = $1;`, [ categoryId ]);
		return requestedCategory.rows[0];
	}
	/**
	 * Edits the category in database
	 * @param categoryId the id of the category to edit
	 * @param newCateogory New category object to replace the old one
	 * @returns Edited category
	 */
	async editCategory(
		categoryId: string,
		newCateogory: RequestCategoryBodyType
	): Promise<CategoryFromDBType> {
		const editedCategory = await db.query<CategoryFromDBType>(
			`
      UPDATE ${CategoryTable.table} 
      SET ${CategoryTable.name} = $2, ${CategoryTable.color} = $3 
      WHERE ${CategoryTable.id} = $1 
      RETURNING *;
    `,
			[ categoryId, newCateogory.name, newCateogory.color ]
		);
		return editedCategory.rows[0];
	}
		/**
   * Deletes category from database
   * @param categoryId The id of the category to delete 
   * @returns {CategoryFromDBType} deleted category 
   */
	async deleteCategoryById(categoryId: string): Promise<CategoryFromDBType> {
		const deletedCategory = await db.query<
			CategoryFromDBType
		>(`DELETE FROM ${CategoryTable.table} WHERE ${CategoryTable.id} = $1 RETURNING *;`, [
			categoryId
		]);
		return deletedCategory.rows[0];
	}

	async clearTable() {
		await db.query(`TRUNCATE TABLE ${CategoryTable.table};`)
	}
}

export default new CategoriesController();
