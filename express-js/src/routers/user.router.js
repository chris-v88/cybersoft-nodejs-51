import express from 'express';
import multer from 'multer';

import { protect } from '../common/middlewares/protect.middleware';
import { userController } from '../controllers/user.controller';
import { uploadLocal } from '../common/multer/local.multer';
import { uploadCloud } from '../common/multer/cloud.multer';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post('/avatar-local', protect, uploadLocal.single('avatar'), userController.avatarLocal);
userRouter.post('/avatar-cloud', protect, uploadCloud.single('avatar'), userController.avatarCloud);

userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export default userRouter;
