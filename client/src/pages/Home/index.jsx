import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user"); // Clear user data
        window.location.href = "/login"; // Redirect to login page
    };

    const goToProfile = () => {
        navigate("/profile"); // Redirect to profile page
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Home</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="./images/profile.jpg" alt="Profile" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Profile</h2>
                    <img
                        src={user.picture}
                        alt="profile"
                        className={styles.profile_img}
                    />
                    <input
                        type="text"
                        defaultValue={user.name}
                        className={styles.input}
                        placeholder="UserName"
                        readOnly
                    />
                    <input
                        type="text"
                        defaultValue={user.email}
                        className={styles.input}
                        placeholder="Email"
                        readOnly
                    />
                    <button className={styles.btn} onClick={logout}>
                        Log Out
                    </button>
                    <button className={styles.btn} onClick={goToProfile}>
                        Complete Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
