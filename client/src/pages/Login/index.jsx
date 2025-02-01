import { useState } from "react"; 
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");  // For email input
    const [password, setPassword] = useState("");  // For password input
    const [error, setError] = useState(""); // For error handling

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        );
    };

    const linkedinAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/linkedin/callback`,
            "_self"
        );
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Send email and password to the backend
            });

            const data = await response.json();
            
            if (response.ok) {
                // Handle successful login, e.g., redirect to dashboard or store user info
                console.log("Login successful:", data);
            } else {
                setError(data.message);  // Show error message if login fails
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Log in Form</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="./images/login.jpg" alt="login" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Members Log in</h2>

                    {/* Email Field */}
                    <div className={styles.input_container}>
                        <input 
                            type="email" 
                            className={styles.input} 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    {/* Password Input with Show/Hide Toggle */}
                    <div className={styles.password_container}>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={styles.input}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                        />
                        <span
                            className={styles.eye_icon}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    {/* Error message if login fails */}
                    {error && <p className={styles.error}>{error}</p>}

                    {/* Log In Button */}
                    <button className={styles.btn} onClick={handleLogin}>Log In</button>

                    {/* Use OTP to login link */}
                    <p className={styles.otp_link}>
                        <Link to="/otp-login">Use OTP to login</Link>
                    </p>

                    <p className={styles.text}>or</p>

                    {/* Google Login Button */}
                    <button className={styles.google_btn} onClick={googleAuth}>
                        <img src="./images/google.png" alt="Google icon" />
                        <span>Sign in with Google</span>
                    </button>

                    {/* LinkedIn Login Button */}
                    <button className={styles.google_btn} onClick={linkedinAuth}>
                        <img src="./images/linkedin.png" alt="LinkedIn icon" />
                        <span>Sign in with LinkedIn</span>
                    </button>

                    <p className={styles.text}>
                        New Here? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
