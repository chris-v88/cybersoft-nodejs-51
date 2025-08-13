import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET } from '../common/constants/app.constant';

export const tokenService = {
   createTokens: (userId) => {
    const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

    return {
      accessToken:  accessToken,
      refreshToken:  '',
    };
   },
};