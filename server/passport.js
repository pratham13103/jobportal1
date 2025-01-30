const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

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

passport.use(
	// LinkedIn Authentication Strategy
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			callbackURL: "/auth/linkedin/callback",
			scope: ["r_emailaddress", "r_liteprofile"],
		},
		function (accessToken, refreshToken, profile, callback) {
			// You can process the profile data here if needed
			callback(null, profile);
		}
	)
);

// Serialize and deserialize user data for sessions
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
