import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logImage from "../assets/Logo.png";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = (event) => {
    event.preventDefault(); // Prevent form submission
    onLogin(email, password); // Pass email and password to onLogin
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div
            className="hidden md:flex w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${logImage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "95%",
            }}
          ></div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back! </h2>
            <p className="text-gray-500 mb-6">Login to access all your data</p>
            <form onSubmit={handleLoginClick}>
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
                className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600"
              >
                Login
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">Or</p>
              <button className="flex items-center justify-center w-full mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google icon"
                  className="w-5 h-5 mr-2"
                />
                Login with Google
              </button>
              <p className="mt-4 text-gray-600">
                Don't have an account?{" "}
                <button onClick={() => navigate("/signup")} className="text-indigo-500 hover:underline">
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
