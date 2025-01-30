import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
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

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<input type="text" className={styles.input} placeholder="Email" />
					<input type="password" className={styles.input} placeholder="Password" />
					<button className={styles.btn}>Log In</button>
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
