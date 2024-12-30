import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 




function SignupPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Validation checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side Image */}
        <div
          className="hidden md:flex w-full md:w-50 h-64 md:h-auto flex items-center justify-center"
          style={{
            backgroundImage: `url(${logoImage})`,
            backgroundPosition: "center",
            backgroundSize: "90%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Right Side Signup Form */}
        <div className="p-8 w-full">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-5">
            Create an account
          </h2>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>


            <div>
  <label className="block text-sm font-medium text-gray-700">
    Password
  </label>
  <div className="relative">
    <input
      type={isVisible ? "text" : "password"}
      placeholder="Create your password"
      className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      type="button"
      onClick={() => setIsVisible(!isVisible)}
      className="absolute top-4 right-3 text-gray-500 focus:outline-none"
    >
      {isVisible ? <FaEyeSlash /> : <FaEye /> }
    </button>
  </div>

  {password && ( // Show validation only when password input is not empty
    <div className="mt-4">
      <ul className="text-sm">
        <li className={`flex items-center ${hasLowercase ? "text-green-600" : "text-red-600"}`}>
          <span className="mr-2">{hasLowercase ? "✔" : "✘"}</span>
          Lowercase letter
        </li>
        <li className={`flex items-center ${hasUppercase ? "text-green-600" : "text-red-600"}`}>
          <span className="mr-2">{hasUppercase ? "✔" : "✘"}</span>
          Uppercase letter
        </li>
        <li className={`flex items-center ${hasNumber ? "text-green-600" : "text-red-600"}`}>
          <span className="mr-2">{hasNumber ? "✔" : "✘"}</span>
          Number
        </li>
        <li className={`flex items-center ${isLongEnough ? "text-green-600" : "text-red-600"}`}>
          <span className="mr-2">{isLongEnough ? "✔" : "✘"}</span>
          At least 8 characters
        </li>
      </ul>
    </div>
  )}
</div>


             <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className="absolute top-4 right-3 text-gray-500 focus:outline-none"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye /> }
                </button>
              </div>
            </div>




            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Create an account
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">Or</p>
            <button className="w-full px-4 py-2 mt-4 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center space-x-2">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google icon"
                className="w-5 h-5 mr-2"
              />
              Create account with Google
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
