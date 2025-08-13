import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../common/constants/app.constant';

export const tokenService = {
   createTokens: (userId) => {
    jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET);

    return {
      accessToken:  '',
      refreshToken:  '',
    };
   },
};