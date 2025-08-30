import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../common/swagger/init.swagger';
import articleRouter from './article.router';
import authRouter from './auth.router';
import demoRouter from './demo.router';
import roleRouter from './role.router';
import userRouter from './user.router';
import chatMessageRouter from './chat-message.router.js';
import chatGroupRouter from './chat-group.router.js';

const rootRouter = express.Router();

rootRouter.use('/docs', swaggerUi.serve);
rootRouter.get('/docs', swaggerUi.setup(swaggerDocument));

rootRouter.use('/demo', demoRouter);
rootRouter.use('/articles', articleRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/role', roleRouter);
rootRouter.use('/user', userRouter);
rootRouter.use('/chat-message', chatMessageRouter);
rootRouter.use('/chat-group', chatGroupRouter);

export default rootRouter;
