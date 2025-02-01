const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passportLinkedIn = require("passport-linkedin-oauth2").Strategy;

passport.use(
	// Google Authentication Strategy
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			// You can process the profile data here if needed
			callback(null, profile);
		}
	)
);

passport.use(new passportLinkedIn({
	clientID: process.env.LINKEDIN_CLIENT_ID,
	clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
	callbackURL: process.env.LINKEDIN_CALLBACK_URL,
	scope: ['r_liteprofile', 'r_emailaddress']
  }, function(accessToken, refreshToken, profile, done) {
	// Handle user profile here
	return done(null, profile);
  }));

// Serialize and deserialize user data for sessions
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
