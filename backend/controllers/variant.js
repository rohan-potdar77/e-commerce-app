import Variant from '../models/variant.js';
import service from '../service.js';

const insertVariants = async (req, res, next) => {
    try {
        const { variants } = req.body;

        if (!Array.isArray(variants) || variants.length === 0)
            throw service.createError('Bad request: invalid data!', 400);

        await Variant.insertMany(variants, { ordered: true });

        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const getVariantsByProductId = async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!productId) throw service.createError('Bad request: no id!', 400);

        const result = await Variant.find({ productId });

        if (!result.length) throw service.createError('Data not found!', 404);

        res.status(200).json({
            success: true,
            message: 'Data found!',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateVariant = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            variantName,
            variantDescription,
            variantQuantity,
            isAvailable,
            productId,
        } = req.body;

        if (!id) throw service.createError('Bad request: invalid id!', 400);

        const result = await Variant.findByIdAndUpdate(
            id,
            {
                $set: {
                    variantName,
                    variantDescription,
                    variantQuantity,
                    isAvailable,
                    productId,
                },
            },
            { returnOriginal: false, runValidators: true }
        );

        if (!result) throw service.createError('Bad request: not found!', 400);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteVariant = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) throw service.createError('Bad request: invalid id!', 400);

        const result = await Variant.findByIdAndDelete(id);

        if (!result) throw service.createError('Bad request: not found!', 400);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    insertVariants,
    getVariantsByProductId,
    updateVariant,
    deleteVariant,
};
