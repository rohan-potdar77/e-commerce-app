import { Schema, model } from 'mongoose';

const fileSchema = new Schema(
    {
        resourceId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        resourceType: {
            type: String,
            required: true,
            enum: ['variant', 'product'],
        },
        originalname: { type: String, required: true },
        mimetype: { type: String, required: true },
        filename: { type: String, required: true },
        path: { type: String, required: true },
    },
    { timestamps: true }
);

const File = model('file', fileSchema);

export default File;
