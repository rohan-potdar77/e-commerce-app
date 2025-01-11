import mongoose from 'mongoose';
import Cart from '../models/cart.js';
import service from '../service.js';

const insertCartItem = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { productId, variantId, orderQuantity } = req.body;

        let result = await Cart.findOne({ userId: _id });

        if (!result) result = await Cart.create({ userId: _id });

        await result.addItem({ productId, variantId, orderQuantity });
        await result.save();

        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const getCartItems = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const userId = new mongoose.Types.ObjectId(_id);

        const result = await Cart.aggregate([
            { $match: { userId: userId, 'items.0': { $exists: true } } },
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.productId',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' },
            {
                $lookup: {
                    from: 'variants',
                    localField: 'items.variantId',
                    foreignField: '_id',
                    as: 'variantDetails',
                },
            },
            {
                $unwind: {
                    path: '$variantDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: '$items._id',
                    product: '$productDetails',
                    variant: '$variantDetails',
                    orderQuantity: '$items.orderQuantity',
                },
            },
        ]);

        if (!result || result.length === 0)
            throw service.createError('Data not found!', 404);

        res.status(200).json({
            success: true,
            message: 'Data found!',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCartItem = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { itemId } = req.params;
        const { productId, variantId, orderQuantity } = req.body;

        const result = await Cart.findOne({ userId: _id });

        if (!result) throw service.createError('Data not found!', 404);

        await result.updateItem(itemId, {
            productId,
            variantId,
            orderQuantity,
        });
        await result.save();

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteCartItem = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { itemId } = req.params;

        const result = await Cart.findOne({ userId: _id });
        if (!result) throw service.createError('Data not found!', 404);

        await result.removeItem(itemId);
        await result.save();

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default { insertCartItem, getCartItems, updateCartItem, deleteCartItem };
