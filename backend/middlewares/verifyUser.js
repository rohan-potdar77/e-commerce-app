import service from '../service.js';

const verifyUser = async (req, res, next) => {
    try {
        const { token } = req.signedCookies;
        
        if (!token)
            throw service.createError('Not authenticated: please login!', 401);
        const decoded = await service.verifyToken(token);

        req.user = decoded.user;
        next();
    } catch (error) {
        return next(error);
    }
};

export default verifyUser;
