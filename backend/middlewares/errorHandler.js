import { Error } from 'mongoose';

const errorHandler = async (error, req, res, next) => {
    console.error(`⚠️  ${error}`);

    let status = error.status;
    let message = error.message ?? 'Internal server error!';

    if (!status) {
        status = error instanceof Error.ValidationError ? 400 : 500;
    }

    if (error.name === 'TokenExpiredError') {
        message = 'Token expired: please login!';
        status = 401;
    }

    if (error.code === 11000 && error.message.includes('userName')) {
        message = 'Username already exists!';
        status = 400;
    }

    res.status(status).json({ success: false, message });
};

export default errorHandler;
