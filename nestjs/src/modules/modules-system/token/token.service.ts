import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

import {
  ACCESS_REFRESH_EXPIRES_IN,
  ACCESS_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
} from '../../../common/constants/app.constant';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createTokens(userId: number) {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: ACCESS_REFRESH_SECRET,
        expiresIn: ACCESS_REFRESH_EXPIRES_IN,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccessToken(accessToken: string, options?: JwtVerifyOptions): any {
    return this.jwtService.verify(accessToken, {
      secret: ACCESS_TOKEN_SECRET,
      ...options,
    });
  }

  verifyRefreshToken(refreshToken: string, options?: JwtVerifyOptions): any {
    return this.jwtService.verify(refreshToken, {
      secret: ACCESS_REFRESH_SECRET,
      ...options,
    });
  }
}
