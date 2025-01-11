import express from 'express';
import rateLimit from 'express-rate-limit';
import user from '../controllers/user.js';

const rateLimitRequestHandler = rateLimit({
  windowMs: 60 * 5 * 1000,
  max: 40,
  message: { error: 'Too many requests, try again later!' },
  standardHeaders: true,
  legacyHeaders: false,
});

const publicRouter = express.Router();

publicRouter.use(rateLimitRequestHandler);

publicRouter.post('/sign-in', user.signin);

publicRouter.post('/sign-up', user.signup);

export default publicRouter;
