import express from 'express';
import user from '../controllers/user.js';
import cartRouter from './cart.js';
import productRouter from './product.js';

const privateRouter = express.Router();

privateRouter.post('/sign-out', user.signout);

// cart item routes
privateRouter.use('/cart-item', cartRouter);

// product routes
privateRouter.use('/product', productRouter);

export default privateRouter;
