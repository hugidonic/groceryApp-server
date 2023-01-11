// Express
import { Router } from 'express';
// Auth middleware
import auth from '../../middlewares/auth.middleware';
// Express validator
import { check } from 'express-validator';
/**
 * Routes
 */
import getUserInfo from './routes/user/getUserInfo';
// Payment routes
import {
	createPayment,
	deletePayment,
	editPayment,
	getPayments,
	getPayment
} from './routes/payment';
// Authentication routes
import loginUser from './routes/user/loginUser';
import registerUser from './routes/user/registerUser';
import deleteUser from './routes/user/deleteUser';
// Delivery Address routes
import {
	createDeliveryAddress,
	deleteDeliveryAddress,
	editDeliveryAddress,
	getDeliveryAddresses,
	getDeliveryAddress
} from './routes/delivery';
// Promo cards routes
import {
	createPromoCard,
	deletePromoCard,
	editPromoCard,
	getPromoCards,
	getPromoCard
} from './routes/promocard';

const router = Router();

// api/user/info
router.get('/info', auth, getUserInfo);

/**
 * * User's Payment CRUD routes
 * * /api/user/info/payment
 */
router.post(
	'/info/payment',
	[
		check('cardName')
			.isLength({ min: 3 })
			.withMessage('Card name must be at least 3 characters'),
		check('cardNumber')
			.custom((value: string) => value.length === 19)
			.withMessage('Card name must be 19 characters')
	],
	auth,
	createPayment
);
router.get('/info/payment', auth, getPayments);
router.get('/info/payment/:paymentId', auth, getPayment);
router.put(
	'/info/payment/:paymentId',
	[
		check('cardName')
			.isLength({ min: 3 })
			.withMessage('Card name must be at least 3 characters'),
		check('cardNumber')
			.custom((value: string) => value.length === 19)
			.withMessage('Card name must be 19 characters')
	],
	auth,
	editPayment
);
router.delete('/info/payment/:paymentId', auth, deletePayment);

/**
 * * User's Delivery Address CRUD routes
 * * /api/user/info/address
 */
router.post(
	'/info/address',
	[
		check('city').notEmpty(),
		check('street').notEmpty(),
		check('house').notEmpty(),
		check('country').notEmpty()
	],
	auth,
	createDeliveryAddress
);
router.get('/info/address', auth, getDeliveryAddresses);
router.get('/info/address/:addressId', auth, getDeliveryAddress);
router.put(
	'/info/address/:addressId',
	[
		check('city').notEmpty(),
		check('street').notEmpty(),
		check('house').notEmpty(),
		check('country').notEmpty()
	],
	auth,
	editDeliveryAddress
);
router.delete('/info/address/:addressId', auth, deleteDeliveryAddress);

/**
 * * User's Promo Cards CRUD routes
 * * /api/user/info/promocard
 */

// ! TODO: NORMILIZE DATA FROM DB
router.post(
	'/info/promocard',
	[
		check('beginDate', 'Begin date should be ISO format').exists().isISO8601().toDate(),
		check('endDate', 'End date should be ISO format').exists().isISO8601().toDate(),
		check('price', "Price should be number").isNumeric()
	],
	auth,
	createPromoCard
);
router.get('/info/promocard', auth, getPromoCards);
router.get('/info/promocard/:promoId', auth, getPromoCard);
router.put(
	'/info/promocard/:promoId',
	[
		check('beginDate', 'Begin date should be ISO format').exists().isISO8601().toDate(),
		check('endDate', 'End date should be ISO format').exists().isISO8601().toDate(),
		check('price', "Price should be number").isNumeric()
	],
	auth,
	editPromoCard
);
router.delete('/info/promocard/:promoId', auth, deletePromoCard);

/**
 * *Authentication routes
 */
// api/user/login
router.post(
	'/login',
	// Validators
	[
		check('email', 'Incorret email').isEmail(),
		check('password', 'Password must be at least 3 characters').isLength({ min: 3 })
	],
	loginUser
);
// api/user/register
router.post(
	'/register',
	// Validators
	[
		check('email', 'Incorrect email').isEmail(),
		check('username', 'Username must be at least 5 characters').notEmpty().isLength({ min: 5 }),
		check('password')
			.isLength({ min: 3 })
			.withMessage('Password must be at least 3 characters')
			.custom((value, { req }) => value == req.body.confirmPassword)
			.withMessage('Passwords should be the same')
	],
	registerUser
);
// api/user/:id
router.delete('/:id', auth, deleteUser);

export default router;
