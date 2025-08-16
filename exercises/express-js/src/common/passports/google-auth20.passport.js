import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_URI_CALLBACK } from '../constants/app.constant';

export const initGoogleAuth20 = () => {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CLIENT_URI_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // hàm này sẽ được chạy khi mọi thử verify với Google thành công
    // sẽ cần profile để kiểm tra trong db

    // ổn => cb(null, user)
    // khôn ổn => cb (new Error(err), null)


    
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));
};