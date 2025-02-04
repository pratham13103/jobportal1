import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./styles.module.css";

function Login({ setUser }) {  // ✅ Accept setUser as a prop
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const googleAuth = () => {
        // Redirect to the Google authentication route
        window.location.href = "http://localhost:8080/api/v1/auth/google";
    };
    
    

    const linkedinAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/linkedin/callback`,
            "_self"
        );
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), 
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user)); 
                setUser(data.user); // ✅ Update user state
                navigate("/home"); 
            } else {
                setError(data.message);
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
                            onChange={(e) => setPassword(e.target.value)} 
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
                    <button
                        className={`${styles.google_btn} ${loading ? styles.loading : ''}`}
                        onClick={googleAuth}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className={styles.loadingText}>Signing you in...</span>
                        ) : (
                        <>
                             <img src="./images/google.png" alt="Google icon" className={styles.googleIcon} />
                             <span>Sign in with Google</span>
                        </>
                        )}
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
