import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logImage from "../assets/Logo.png";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
      setShowSuccessMessage(true); // Show success message
      setError(""); // Clear error
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 2 seconds
        onLoginSuccess("admin");
        navigate("/admin");
      }, 300);
    } else if (email === "user@gmail.com" && password === "user") {
      setShowSuccessMessage(true); // Show success message
      setError(""); // Clear error
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 2 seconds
        onLoginSuccess("user");
        navigate("/home");
      }, 800);
    } else {
      setError("Invalid email or password. Please try again.");
      setTimeout(() => {
        setError(""); // Clear the error message after 1 second
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-12">
      {/* Success Message Box */}
{showSuccessMessage && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-out">
    <p className="font-semibold text-lg"> Login Successful! Redirecting...</p>
  </div>
)}


      {/* Error Message */}
      {error && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center shadow-md z-50">
          <p className="font-semibold text-lg">{error}</p>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {/* Logo/Image Section */}
          <div
            className="hidden md:flex w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${logImage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "95%",
            }}
          ></div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-gray-500 mb-6">Login to access all your data</p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your Email Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">Or</p>
              <button className="flex items-center justify-center w-full mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google icon"
                  className="w-5 h-5 mr-2"
                />
                Login with Google
              </button>
              <p className="mt-4 text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-indigo-500 hover:underline"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
