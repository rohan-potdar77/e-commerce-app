import express from 'express';
import cart from '../controllers/cart.js';

const cartRouter = express.Router();

cartRouter.post('/', cart.insertCartItem);

cartRouter.get('/', cart.getCartItems);

cartRouter.put('/:itemId', cart.updateCartItem);

cartRouter.delete('/:itemId', cart.deleteCartItem);

export default cartRouter;
