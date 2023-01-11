import {Request, Response} from 'express'
import { getImageUri } from '../../../utils'
import ProductsController from '../Products.controller'
import { ProductType } from '../Products.types'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsFromDb = await ProductsController.getProducts()
    const products: ProductType[] = productsFromDb.map(prod => ({
      id: prod.id,
      name: prod.name,
      type: prod.type,
      price: prod.price,
      description: prod.description,
      richDescription: prod.rich_description,
      pictureUri: getImageUri(prod.name),
    }))
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}