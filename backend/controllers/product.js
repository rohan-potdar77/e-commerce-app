import Product from '../models/product.js';
import service from '../service.js';

const insertProducts = async (req, res, next) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products) || products.length === 0)
            throw service.createError('Bad request: invalid data!', 400);

        await Product.insertMany(products, { ordered: true });

        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        let { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;
        const filter = {};

        if (category) filter.productCategory = category;

        if (minPrice)
            filter.price = { ...filter.price, $gte: parseInt(minPrice) };

        if (maxPrice)
            filter.price = { ...filter.price, $lte: parseInt(maxPrice) };

        const products = await Product.aggregate([
            { $match: filter },
            {
                $facet: {
                    data: [
                        { $sort: { price: 1 } },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalCount: [{ $count: 'count' }],
                },
            },
            {
                $project: {
                    data: 1,
                    totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
                },
            },
        ]);

        if (!products.length || !products[0].data.length) {
            throw service.createError('No data!', 404);
        }

        const totalCount = products[0].totalCount;
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            success: true,
            message: 'Data found!',
            data: products[0].data,
            pagination: { page, limit, totalCount, totalPages },
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { returnOriginal: false, runValidators: true }
        );

        if (!result) throw service.createError('Bad request: not found!', 400);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Product.findByIdAndDelete(id);

        if (!result) throw service.createError('Bad request: not found!', 400);
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    insertProducts,
    getProducts,
    updateProduct,
    deleteProduct,
};
