import { Schema, model } from 'mongoose';
import service from '../service.js';

const itemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product',
    },
    variantId: { type: Schema.Types.ObjectId, default: null, ref: 'variant' },
    orderQuantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer!',
        },
    },
});

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        items: { type: [itemSchema], default: [] },
    },
    { timestamps: true }
);

cartSchema.method('addItem', async function (item) {
    await model('tempSchema', itemSchema).validate(item);

    const existing = this.items.find(
        cartItem =>
            cartItem.productId.toString() === item.productId.toString() &&
            cartItem.variantId?.toString() === item.variantId?.toString()
    );

    if (existing) {
        existing.orderQuantity += item.orderQuantity;
    } else {
        this.items.push(item);
    }
});

cartSchema.method('removeItem', async function (itemId) {
    const index = this.items.findIndex(item => item._id.toString() === itemId);

    if (index === -1) throw service.createError('Item not found!', 404);

    const result = this.items.splice(index, 1);

    if (!result.length) throw service.createError('Error removing item!', 500);
});

cartSchema.method('updateItem', async function (itemId, item) {
    await model('tempSchema', itemSchema).validate(item);

    const existing = this.items.find(item => item._id.toString() === itemId);

    if (!existing) throw service.createError('Item not found!', 404);

    existing.productId = item.productId;
    existing.variantId = item.variantId;
    existing.orderQuantity = item.orderQuantity;
});

const Cart = model('cart', cartSchema);

export default Cart;
