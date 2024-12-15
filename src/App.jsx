import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import HomePage from "./components/Home";
import Admin from "./components/Admin";

import Tickets from "./components/Tickets";
import Predictions from "./components/Predictions";

import AdminDashboard from "./components/AdminDashboard";
import Tickets1 from "./components/Tickets1";
import LiveTracking from "./components/LiveTracking";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("loggedIn") === "true";
    const savedUserType = localStorage.getItem("userType");
    if (savedLoggedIn) {
      setLoggedIn(true);
      setUserType(savedUserType);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType(null);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userType");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!loggedIn && (
          <>
            <Route
              path="/"
              element={<LoginPage onLoginSuccess={(type) => {
                setLoggedIn(true);
                setUserType(type);
              }} />}
            />
            <Route path="/signup" element={<SignupPage />} />
          </>
        )}

        {/* Admin Routes */}
        {loggedIn && userType === "admin" && (
          <>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<Admin onLogout={handleLogout} />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </>
        )}

        {/* User Routes */}
        {loggedIn && userType === "user" && (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
            <Route path="/Tickets" element={<Tickets />} />
            <Route path="/Predictions" element={<Predictions />} />
            <Route path="/Tickets1" element={<Tickets1 />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
