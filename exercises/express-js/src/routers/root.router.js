import express from 'express';
import demoRouter from './demo.router';
import articleRouter from './article.router';
import authRouter from './auth.router';
import roleRouter from './role.router';

const rootRouter = express.Router();

rootRouter.use('/demo', demoRouter);
rootRouter.use('/articles', articleRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/roles', roleRouter);

export default rootRouter;
