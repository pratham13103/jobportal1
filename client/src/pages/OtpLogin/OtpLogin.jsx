import { useState } from "react";
import axios from "axios";
import styles from "./OtpLogin.module.css"; // Optional: for modular styling

function OtpLogin() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const countryCode = "+91"; // Example for India

    // Function to send OTP
    const sendOtp = async () => {
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send-otp`, { phone });
            if (response.status === 200) {
                setIsOtpSent(true);
                alert("OTP sent successfully!");
            }
        } catch (error) {
            alert("Error sending OTP. Try again.");
        }
    };

    // Function to verify OTP
    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/otp/verify-otp`, { phone, otp });
            if (response.status === 200) {
                alert("OTP verified successfully!");
            } else {
                alert("Invalid OTP. Try again.");
            }
        } catch (error) {
            alert("Error verifying OTP.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>OTP Login</h2>
                {!isOtpSent ? (
                    <div>
                        <div className={styles.phone_input}>
                            {/* Country code input */}
                            <input
                                type="text"
                                value={countryCode}
                                readOnly
                                className={styles.country_code}
                            />
                            {/* Phone number input */}
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <button onClick={sendOtp} className={styles.button}>Send OTP</button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={styles.input}
                        />
                        <button onClick={verifyOtp} className={styles.button}>Verify OTP</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OtpLogin;
