import express from 'express';
import passport from 'passport';

import { authController } from '../controllers/auth.controller';
import { protect } from '../common/middlewares/protect.middleware';
import { checkPermission } from '../common/middlewares/check-permission.middleware';

const authRouter = express.Router();

authRouter.post('/', authController.create);
authRouter.get('/', authController.findAll);

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/get-info', protect, checkPermission, authController.getInfo);
authRouter.post('/refresh-token', authController.refreshToken);

// FE sẽ gọi từ cái thanh địa chỉ của trình duyệt để kích hoạt gọi api GET tới: https://localhost:3069/api/auth/google
// BE sẽ nhận được yêu cầu xác thực từ Google và passport sẽ phản hồi res.redirect() về lại FE để chuyển FE sang trang đăng nhập của Google
// người dùng sẽ đăng nhập vào Google
authRouter.get(
  '/google',
  // async (req, res, next) => { // middlleware
  //   await new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 5000);
  //   });
  //   console.log('1234');
  //   next();
  // },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// sau khi người dùng đã xác thực thành công với bên Google
// Google sẽ redirect lại ỦL mà chúng ta đã cung cấp cho google trước
// quang trọng là nhận dc code của google trả về
// chủ yếu passport.authenticate("google") cần code dể làm việc với gôgle nếu thành công thì chạy tiếp, không thành công thf phản hồi về FE failureRedirect:: "/login"
// nếu thành công thì chạy callback trong passport.use(new GoogleStrategy())
authRouter.get(
  '/google/callback',
  passport.authenticate(
    'google',
    //   (req, res, next) => {
    //   console.log('✅ Google authentication successful');
    //   next();
    // },
    { failureRedirect: '/login', session: false }
  ),
  authController.googleAuth20 // controller xử lý sau khi xác thực thành công
);

authRouter.get('/:id', authController.findOne);
authRouter.patch('/:id', authController.update);
authRouter.delete('/:id', authController.remove);

export default authRouter;
