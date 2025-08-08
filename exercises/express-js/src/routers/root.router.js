import express from 'express';
import demoRouter from './demo.router';
import articleRouter from './article.router';

const rootRouter = express.Router();

rootRouter.use('/demo', demoRouter);
rootRouter.use('/articles', articleRouter);

export default rootRouter;
