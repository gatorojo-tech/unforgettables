const passport = require("passport");
const PassportGoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const createUserProfile = require("../persistHelpers/createUserProfile");

const Auth = mongoose.model("auth");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Auth.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new PassportGoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await Auth.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new Auth({
        googleId: profile.id
      }).save();
      await createUserProfile(profile.id);
      done(null, newUser);
    }
  )
);
