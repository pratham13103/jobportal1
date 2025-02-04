import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

function Signup() {
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    updates: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  // State for password input
  const [password, setPassword] = useState("");

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
      } else {
        alert(result.message || "Error during signup.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while sending the request.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up Form</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/signup.jpg" alt="signup" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create Account</h2>
          
          {/* Username Field */}
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          
          {/* Email Field */}
          <input
            type="text"
            className={styles.input}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          
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
          
          
          {/* Phone Field */}
          <input
            type="text"
            className={styles.input}
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
          {/* Checkbox for Updates */}
          <div className={styles.checkbox_container}>
            <input
              type="checkbox"
              id="updates"
              className={styles.checkbox}
              name="updates"
              checked={formData.updates}
              onChange={handleChange}
            />
            <label htmlFor="updates" className={styles.checkbox_label}>
              Send me important updates via SMS, Email, and WhatsApp
            </label>
          </div>

          {/* Terms & Conditions */}
          <p className={styles.terms}>
            By clicking Register, you agree to the <Link to="/terms">Terms and Conditions</Link> & <Link to="/privacy">Privacy Policy</Link>.
          </p>
          
          {/* Register Now Button */}
          <button className={styles.btn} onClick={handleSubmit}>
            Register Now
          </button>

          {/* Already Have an Account? */}
          <p className={styles.text}>
            Already Have an Account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
