require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const otpRoute = require("./routes/otp"); // Import OTP route
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

// Ensure the LinkedIn auth module exists before requiring it
try {
    require("./linkedin");
} catch (err) {
    console.error("Error loading LinkedIn authentication:", err.message);
}

const app = express();

// Middleware for cookies
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(express.json()); // Important for OTP API request handling

// Routes
app.use("/otp", otpRoute); // Add OTP route
app.use("/api/v1/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
