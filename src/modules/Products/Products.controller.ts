import db, { ProductTable } from '../../sql';
import { ProductTypeFromDB, RequestBodyProduct } from './Products.types';

class ProductsController {
	/**
   * Creates a new Product object in database without image
   * @param product the body of the request object containing the product information
   * @returns {ProductTypeFromDB}
   */
	async createProduct(product: RequestBodyProduct): Promise<ProductTypeFromDB> {
		const createdProduct = await db.query<
			ProductTypeFromDB
		>(
			`INSERT INTO ${ProductTable.table} (${ProductTable.name}, ${ProductTable.type}, ${ProductTable.description}, ${ProductTable.richDescription}, ${ProductTable.price}) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
			[
				product.name,
				product.type,
				product.description,
				product.richDescription,
				product.price
			]
		);
		return createdProduct.rows[0];
	}
	
	/**
   * gets all products from database
   * @returns {ProductTypeFromDB[]}
   */
	async getProducts(): Promise<ProductTypeFromDB[]> {
		const products = await db.query<ProductTypeFromDB>(`SELECT * FROM ${ProductTable.table};`);
		return products.rows;
	}

	/**
   * gets SINGLE product by given product id
   * @param productId th Id of the product to get
   * @returns {ProductTypeFromDB}
   */
	async getProductById(productId: string): Promise<ProductTypeFromDB> {
		const requestedProduct = await db.query<ProductTypeFromDB>(
			`SELECT * FROM ${ProductTable.table} WHERE ${ProductTable.id} = ${productId}`
		);
		return requestedProduct.rows[0];
	}

	/**
	 * Edits the product in database
	 * @param productId the id of the product to edit
	 * @param newProduct New product object to replace the old one
	 * @returns Edited product
	 */
	async editProduct(
		productId: string,
		newProduct: RequestBodyProduct
	): Promise<ProductTypeFromDB> {
		const editedProduct = await db.query<ProductTypeFromDB>(
			`
		UPDATE ${ProductTable.table} 
		SET ${ProductTable.name} = $2, ${ProductTable.type} = $3, ${ProductTable.description} = $4, ${ProductTable.richDescription} = $5, ${ProductTable.price} = $6,
		WHERE ${ProductTable.id} = $1 
		RETURNING *;
		`,
			[
				productId,
				newProduct.name,
				newProduct.type,
				newProduct.description,
				newProduct.richDescription,
				newProduct.price
			]
		);

		return editedProduct.rows[0];
	}
	/**
   * Deletes product from database
   * @param productId The id of the product to delete 
   * @returns {ProductTypeFromDB} deleted product 
   */
	async deleteProduct(productId: string): Promise<ProductTypeFromDB> {
		const deletedProduct = await db.query<
			ProductTypeFromDB
		>(`DELETE FROM ${ProductTable.table} WHERE ${ProductTable.id} = $1 RETURNING *;`, [
			productId
		]);
		return deletedProduct.rows[0];
	}

	async clearTable(): Promise<void> {
		await db.query(`TRUNCATE ${ProductTable.table}`);
	}
}

export default new ProductsController();
