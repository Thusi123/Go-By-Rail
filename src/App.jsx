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
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch login status and user type from localStorage on initial load
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("loggedIn") === "true";
    const savedUserType = localStorage.getItem("userType");
    if (savedLoggedIn) {
      setLoggedIn(true);
      setUserType(savedUserType);
    }
    fetchData(); // Fetch MongoDB data when app loads
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType(null);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userType");
  };

  // MongoDB-related functions
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post("http://localhost:5000/items", { name: newItem });
      fetchData();
      setNewItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!loggedIn && (
          <>
            <Route
              path="/"
              element={
                <LoginPage
                  onLoginSuccess={(type) => {
                    setLoggedIn(true);
                    setUserType(type);
                  }}
                />
              }
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
            {/* MongoDB Example Page */}
            <Route
              path="/mongo-example"
              element={
                <div>
                  <h1>MongoDB Example</h1>
                  <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add item"
                  />
                  <button onClick={addItem}>Add</button>
                  <ul>
                    {data.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              }
            />
          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
