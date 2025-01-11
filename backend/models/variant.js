import { Schema, model } from 'mongoose';

const variantSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'product',
        },
        variantName: { type: String, required: true },
        variantDescription: { type: Object, default: null },
        variantQuantity: { type: Number, required: true, min: 0 },
        isAvailable: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Variant = model('variant', variantSchema);

export default Variant;
