import express from 'express';
import variant from '../controllers/variant.js';

const variantRouter = express.Router();

variantRouter.post('/', variant.insertVariants);

variantRouter.get('/:productId', variant.getVariantsByProductId);

variantRouter.put('/:id', variant.updateVariant);

variantRouter.delete('/:id', variant.deleteVariant);

export default variantRouter;
