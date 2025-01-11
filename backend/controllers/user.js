import User from '../models/user.js';
import service from '../service.js';
import configuration from '../configuration.js';

const isProductionEnv = (configuration.prodEnv ?? 'false') === 'true';

const signup = async (req, res, next) => {
    try {
        const { userName, password, userType } = req.body;

        const result = new User({ userName, userType });

        await result.hashAndSavePassword(password);
        await result.save();

        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        const document = await User.findOne({ userName });
        if (!document) throw service.createError('User not found!', 404);

        const isMatch = await document.checkPassword(password);
        if (!isMatch) throw service.createError('Wrong password!', 401);

        const token = await service.generateToken({ user: document });
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: isProductionEnv,
            sameSite: isProductionEnv ? 'none' : 'lax',
            signed: true,
        })
            .status(200)
            .json({
                success: true,
                message: 'Sign in successful!',
                data: document.userType,
            });
    } catch (error) {
        next(error);
    }
};

const signout = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: isProductionEnv,
            sameSite: isProductionEnv ? 'none' : 'lax',
            signed: true,
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default { signup, signin, signout };
