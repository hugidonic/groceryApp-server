import { Router } from 'express';
import admin from '../../middlewares/admin.middleware';
import { deleteCategory, editCategory, getAllCategories, getCategory } from './routes';
// Admin routes
import { deleteAllCategoriesFromDB, loadAllCategoriesInDB } from './routes/admin';

const router = Router();

/**
 * * Loads all products from file into database image.png
 *    /api/categories/loadAll
 */
router.get('/categories/loadAll', admin, loadAllCategoriesInDB);
/**
  * * Deletes all categories from database 
  *    /api/categories/loadAll
  */
router.delete('/categories/deleteAll', admin, deleteAllCategoriesFromDB);

/**
  * * categories CRUD routes
  * * /api/categories
  */
router.get('/categories/', getAllCategories);
router.get('/categories/:categoryId', getCategory);
router.put('/categories/:categoryId', admin, editCategory);
router.delete('/categories/:categoryId', admin, deleteCategory);

export default router;
