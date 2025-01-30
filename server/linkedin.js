const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_liteprofile', 'r_emailaddress']
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

module.exports = passport;
