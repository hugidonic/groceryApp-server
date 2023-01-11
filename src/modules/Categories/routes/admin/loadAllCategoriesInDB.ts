import {Request, Response} from 'express'
import { data } from '../../../../data'
import CategoriesController from '../../Categories.controller'

export const loadAllCategoriesInDB = async (req: Request, res: Response) => {
  try {
    data.categories.forEach(async (category) => await CategoriesController.createCategory(category))
    res.status(200).json({message: "All categories loaded successfully"})
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}