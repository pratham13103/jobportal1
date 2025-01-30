import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

function Signup() {
	const [otpSent, setOtpSent] = useState(false);

	const sendOtp = () => {
		// Call AWS SNS API to send OTP
		setOtpSent(true);
	};

	const verifyOtp = () => {
		// Verify OTP logic
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
					<input type="text" className={styles.input} placeholder="Username" />
					<input type="text" className={styles.input} placeholder="Email" />
					<input type="text" className={styles.input} placeholder="Phone" />
					<input type="password" className={styles.input} placeholder="Password" />
					{otpSent ? (
						<input type="text" className={styles.input} placeholder="Enter OTP" />
					) : (
						<button className={styles.btn} onClick={sendOtp}>Send OTP</button>
					)}
					{otpSent && <button className={styles.btn} onClick={verifyOtp}>Verify OTP</button>}
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
