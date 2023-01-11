import {Request, Response} from 'express'
import { getImageUri } from '../../../utils'
import CategoriesController from '../Categories.controller'
import { CategoryType } from '../Categories.types'

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categoriesFromDB = await CategoriesController.getAllCatgories()
    const categories: CategoryType[] = categoriesFromDB.map(cat => ({
      ...cat,
      pictureUri: getImageUri(cat.name),
    }))
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}