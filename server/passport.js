const passport = require("passport");
require("dotenv").config();
const { Users } = require("./database/models/Users");


const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // attempt to find existing user
        let user = await Users.findOne({ googleId: profile.id });
        if (!user) {
          // create new user
          user = await Users.create({
            googleId: profile.id,
            username: profile.username,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
          });
        }
          return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
