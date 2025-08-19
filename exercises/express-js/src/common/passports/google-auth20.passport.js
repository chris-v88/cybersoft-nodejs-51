import passport from 'passport';
import prisma from '../prisma/init.prisma';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_URI_CALLBACK,
} from '../constants/app.constant';
import { tokenService } from '../../services/token.service';

export const initGoogleAuth20 = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CLIENT_URI_CALLBACK,
      },
      async (accessToken, refreshToken, profile, cb) => {
        // hàm này sẽ được chạy khi mọi thử verify với Google thành công
        // sẽ cần profile để kiểm tra trong db

        // console.log({ accessToken, refreshToken, profile, cb })
        try {
          console.log('🔄 Starting Google auth verification...');

          // extra profile data
          const googleId = profile.id;
          const displayName = profile.displayName;
          const email = profile.emails?.[0]?.value;
          const verifiedEmail = profile.emails?.[0]?.verified;
          const photo = profile.photos?.[0]?.value;

          // ổn => cb(null, user)
          // khôn ổn => cb (new Error(err), null)

          if (!email) {
            console.log('❌ No email found in profile');
            return cb(new Error('No email found'), null);
          }

          if (!verifiedEmail) {
            console.log('❌ Email not verified:', email);
            return cb(new Error('Email not verified'), null);
          }

          let user = await prisma.users.findUnique({
            where: { email: email },
          });

          // nếu chưa có user thì tạo user mới
          if (!user) {
            console.log('➕ Creating new user:', email);
            user = await prisma.users.create({
              data: {
                email: email,
                avatar: photo,
                fullName: displayName,
                googleId: googleId,
              },
            });
          } else {
            console.log('✅ Found existing user:', user.id);
          }
          const tokens = tokenService.createTokens(user.id);
          return cb(null, tokens);
        } catch (error) {
          console.error('❌ Google auth error:', error);
          return cb(error, null);
        }

        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
  );
};
