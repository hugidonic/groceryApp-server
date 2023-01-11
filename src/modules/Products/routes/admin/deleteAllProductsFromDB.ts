import {Request, Response} from 'express'
import ProductsController from '../../Products.controller'

export const deleteAllProductsFromDB = async (req: Request, res: Response) => {
  try {
    await ProductsController.clearTable()
    res.status(200).json({ message: "All products deleted"})
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}