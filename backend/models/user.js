import { Schema, model } from 'mongoose';
import service from '../service.js';

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        password: { type: String, required: true },
        userType: {
            type: String,
            enum: ['Administrator', 'User'],
            default: 'User',
        },
    },
    { timestamps: true }
);

userSchema.method('hashAndSavePassword', async function (password) {
    this.password = await service.generateHash(password);
});

userSchema.method('checkPassword', async function (password) {
    return await service.verifyHash(password, this.password);
});

const User = model('user', userSchema);

export default User;
