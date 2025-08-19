import prisma from '../common/prisma/init.prisma';
import * as bcrypt from 'bcrypt';

import { BadResquestException, UnauthorizedException } from '../common/helpers/exception.helper';
import { tokenService } from './token.service';

export const authService = {
  create: async (req) => {
    return `created`;
  },
  findAll: async (req) => {
    return `all auths`;
  },
  findOne: async (req) => {
    return `one auth - ${req.params.id}`;
  },
  update: async (req) => {
    return `updated auth - ${req.params.id}`;
  },
  remove: async (req) => {
    return `removed auth - ${req.params.id}`;
  },
  register: async (req) => {
    const { email, password, fullName } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    // console.log('🚀 ~ user:', user);

    if (user) {
      throw new BadResquestException(
        "User already exists. Can't register another one"
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: passwordHash,
        fullName,
      },
    });
    // console.log('🚀 ~ newUser:', newUser);

    return newUser;
  },
  
  login: async (req) => {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      }
    })

    if (!user) throw new BadResquestException("User does not exist. Can't login");

    // Nếu code chạy được tới đây => đảm bảo có user
    // user.password
    const isPasswordValid = bcrypt.compareSync(password, user.password); // true | false
    if(!isPasswordValid) throw new BadResquestException("Password is not correct. Can't login");
    
    // nếu code chạy dc tới đây => ng dừng hợp lệ
    // trả lại token
    const tokens = tokenService.createTokens(user.id);
    return tokens;
  },

  getInfo: async (req) => {
    delete req.user.password; // xoa password ra khoi du lieu tra ve
    return req.user;
  },

  refreshToken: async (req) => {
    const { accessToken, refreshToken } = req.body;
    console.log(`🚀 ~ accessToken, refreshToken:`, accessToken, refreshToken);

    // verify accesToken (trưởng hợp hết hạn) bỏ kiểm tra hết hạn
    const decodedAccessToken = tokenService.verifyAccessToken(accessToken, {ignoreExpiration: true });
    const decodedRefreshToken = tokenService.verifyRefreshToken(refreshToken);

    if (decodedAccessToken.userId !== decodedRefreshToken.userId) throw new UnauthorizedException("Token Invalid");

    const user = await prisma.users.findUnique({
      where: {
        id: decodedRefreshToken.userId,
      }
    });

    if (!user) throw new UnauthorizedException("User invalid");

    const tokens = tokenService.createTokens(user.id);
    return tokens;
  },

  googleAuth20: (req, res) => {
    try {
      console.log('✅ Google authentication successful', req.user);  

      if (!req.user || !req.user.accessToken || !req.user.refreshToken) {
        console.error('❌ Missing tokens in req.user:', req.user);
        // return res.redirect('http://localhost:3000/login?error=missing_tokens');

        return 'http://localhost:3000/login?error=missing_tokens'; // trả về url redirect để controller xử lý
      }
      const { accessToken, refreshToken } = req.user;

      const urlRedirect = `http://localhost:3000/login-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;
      
      // Successful authentication, redirect home.
      // res.redirect(urlRedirect); // việc của controller làm

      return urlRedirect; // trả về url redirect để controller xử lý
    } catch (error) {
      console.error('❌ Callback error:', error);
      // res.redirect('http://localhost:3000/login?error=callback_failed');

      return 'http://localhost:3000/login?error=callback_failed';
    }
  }
};
