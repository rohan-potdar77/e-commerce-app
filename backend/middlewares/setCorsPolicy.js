import service from '../service.js';

const setCorsPolicy = clientUrls => {
    const whitelist = clientUrls.split(',');
    return {
        origin: (origin, callback) => {
            if (!origin || whitelist?.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(
                    service.createError(
                        `Origin ${origin} is not allowed by CORS policy!`,
                        403
                    )
                );
            }
        },
        optionsSuccessStatus: 204,
        credentials: true,
    };
};

export default setCorsPolicy;
