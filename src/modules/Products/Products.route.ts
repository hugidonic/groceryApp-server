// Express
import { Router } from 'express';
// Admin Routes
import { deleteAllProductsFromDB, loadAllProductsInDB } from './routes/admin';
// Product CRUD routes
import { deleteProduct, editProduct, getAllProducts, getProduct } from './routes';
import admin from '../../middlewares/admin.middleware';

const router = Router();

/**
 * * Loads all products from file into database 
 *    /api/products/loadAll
 */
router.get('/products/loadAll', admin, loadAllProductsInDB);
/**
 * * Deletes all products from database 
 *    /api/products/loadAll
 */
router.delete('/products/deleteAll', admin, deleteAllProductsFromDB);

/**
 * * Products CRUD routes
 * * /api/products
 */
// router.post('/products/', createProduct)
router.get('/products/', getAllProducts);
router.get('/products/:productId', getProduct);
router.put('/products/:productId', admin, editProduct);
router.delete('/products/:productId', admin, deleteProduct);

export default router;
