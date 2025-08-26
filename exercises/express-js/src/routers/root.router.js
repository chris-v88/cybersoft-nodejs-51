import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../common/swagger/init.swagger';
import articleRouter from './article.router';
import authRouter from './auth.router';
import demoRouter from './demo.router';
import roleRouter from './role.router';

const rootRouter = express.Router();

rootRouter.use('/docs', swaggerUi.serve);
rootRouter.get('/docs', swaggerUi.setup(swaggerDocument));

rootRouter.use('/demo', demoRouter);
rootRouter.use('/articles', articleRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/role', roleRouter);

export default rootRouter;
