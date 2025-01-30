const router = require("express").Router();
const passport = require("passport");

// Login Success Route
router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

// Login Failed Route
router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Login failure",
	});
});

// Google Authentication
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

// LinkedIn Authentication
router.get("/linkedin", passport.authenticate("linkedin"));

router.get(
	"/linkedin/callback",
	passport.authenticate("linkedin", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

// Logout Route
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
