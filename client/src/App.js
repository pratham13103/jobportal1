import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpLogin from "./pages/OtpLogin/OtpLogin";
import Profile from "./pages/Profile/Profile";

import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const storedUser = localStorage.getItem("user"); // ✅ Check LocalStorage first
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    setLoading(false);
                    return;
                }
    
                // If no user in local storage, fetch from backend
                const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
                const { data } = await axios.get(url, { withCredentials: true });
                setUser(data.user?._json || null);
            } catch (err) {
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };
    
        getUser();
    }, []);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                <Route path="/otp-login" element={<OtpLogin />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

            </Routes>
        </div>
    );
}

export default App;
