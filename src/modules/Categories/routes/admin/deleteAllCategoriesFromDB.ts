import {Request, Response} from 'express'
import CategoriesController from '../../Categories.controller'

export const deleteAllCategoriesFromDB = async (req: Request, res: Response) => {
  try {
    await CategoriesController.clearTable()
    res.status(200).json({ message: "All categories deleted"})
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}