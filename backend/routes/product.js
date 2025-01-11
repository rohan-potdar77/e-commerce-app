import express from 'express';
import variantRouter from './variant.js';
import product from '../controllers/product.js';

const productRouter = express.Router();

productRouter.post('/', product.insertProducts);

productRouter.get('/', product.getProducts);

productRouter.put('/:id', product.updateProduct);

productRouter.delete('/:id', product.deleteProduct);

// variant routes
productRouter.use('/variant', variantRouter);

export default productRouter;
