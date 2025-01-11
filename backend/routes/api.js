import express from 'express';
import verifyUser from '../middlewares/verifyUser.js';
import privateRouter from './private.js';
import publicRouter from './public.js';

const apiRouter = express.Router();

// public routes
apiRouter.use('/public', publicRouter);

// private routes
apiRouter.use('/private', verifyUser, privateRouter);

export default apiRouter;
