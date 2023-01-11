import { Router, Request, Response } from 'express';
// Types
import { OrderType } from './Orders.types';
// Express validator
import { body, validationResult } from 'express-validator';
import OrdersController from './Orders.controller';
import auth from '../../middlewares/auth.middleware';
// Routes
import { createOrder, getAllOrdersByUserId, getOrderById } from './routes/';

const router = Router();

// /api/order
router.post(
	'/order',
	auth,
	// Validators
	[
		body('createdAt').isString().notEmpty(),
		body('price').isNumeric().notEmpty(),
		body('cartItems').notEmpty(),
		body('deliveryAddressId').notEmpty(),
		body('paymentMethodId').notEmpty(),
	],
	createOrder
);

// /api/orders
router.get('/orders', auth, getAllOrdersByUserId);
// /api/orders/:orderId
router.get('/orders/:orderId', auth, getOrderById);



export default router;
