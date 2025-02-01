const router = require("express").Router();
const passport = require("passport");
const pool = require("../db"); // Import the database connection

// Temporary in-memory store for users
let users = [];

// Signup Route
router.post("/signup", async (req, res) => {
	const { username, email, password, phone } = req.body;
  
	try {
	  // Check if the email already exists
	  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
	  if (rows.length > 0) {
		return res.status(400).json({ error: true, message: "Email already exists" });
	  }
  
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  // Insert user into the database
	  const [result] = await pool.execute("INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)", [username, email, hashedPassword, phone]);
  
	  // Respond with success
	  res.status(200).json({ message: "User registered successfully", userId: result.insertId });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: true, message: "Internal Server Error" });
	}
  });

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database for the user by email
        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = rows[0];

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Respond with success
        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
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
