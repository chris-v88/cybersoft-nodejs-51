import jwt from 'jsonwebtoken';
import { 
  ACCESS_TOKEN_EXPIRES_IN, 
  ACCESS_TOKEN_SECRET,
  ACCESS_REFRESH_SECRET,
  ACCESS_REFRESH_EXPIRES_IN 
} from '../common/constants/app.constant';

export const tokenService = {
   createTokens: (userId) => {
    const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    
    // ở nhiều cty, sẽ có thêm token khác nữa, tuỳ theo chiến lược cty 
    const refreshToken = jwt.sign({ userId: userId }, ACCESS_REFRESH_SECRET,
      { expiresIn: ACCESS_REFRESH_EXPIRES_IN }
    );

    return {
      accessToken:  accessToken,
      refreshToken:  refreshToken,
    };
   },

   verifyAccessToken: (accessToken) => {
    const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    return decodedToken;
   }
};