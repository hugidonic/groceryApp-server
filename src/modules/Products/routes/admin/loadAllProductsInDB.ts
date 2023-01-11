import {Request, Response} from 'express'
import { data } from '../../../../data'
import ProductsController from '../../Products.controller'

export const loadAllProductsInDB = async (req: Request, res: Response) => {
  try {
    data.products.forEach(async (product) => await ProductsController.createProduct(product))
    res.status(200).json({message: "All products loaded successfully"})
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}