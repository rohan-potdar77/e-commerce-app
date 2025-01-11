import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        productName: { type: String, required: true, trim: true },
        productDescription: { type: String, required: true, trim: true },
        productBrand: { type: String, required: true, trim: true },

        productCategory: {
            type: String,
            enum: [
                'Electronic',
                'Cloth',
                'Furniture',
                'Toy',
                'Mobile',
                'TV',
                'Sport',
                'Computer',
                'Utensil',
                'Other',
                'Shoe',
            ],
            required: true,
        },

        price: { type: Number, required: true, min: 0 },
        currency: { type: String, enum: ['INR', 'USD', 'EUR'], default: 'INR' },
        discount: { type: Number, min: 0, max: 100, default: 0 },
        totalQuantity: { type: Number, required: true, min: 0 },
        isAvailable: { type: Boolean, default: true },

        // images: { type: [String], default: [] },
        // videos: { type: [String], default: [] },

        specifications: { type: Object, default: {} },
        features: { type: [String], default: [] },

        // averageRating: { type: Number, default: 0, min: 0, max: 5 },
        // numberOfReviews: { type: Number, default: 0 },
        // salesCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = model('product', productSchema);

export default Product;
