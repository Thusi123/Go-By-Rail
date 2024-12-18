import React, { useState } from "react";
import logImage from "../assets/Logo.png"; // Adjust if Header.jsx is deeper in the folder structure
import { Link, useNavigate } from "react-router-dom"; // For navigation

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State for toggling dropdown
  const [isModalOpen, setIsModalOpen] = useState(false); // State for toggling modal
  const [query, setQuery] = useState(''); // State for search input
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const handleLogout = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmSignOut = () => {
    setIsModalOpen(false);
    localStorage.removeItem("authToken"); // Example: Clear token if used
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Refresh the login page
  };

  const cancelSignOut = () => {
    setIsModalOpen(false); // Close the modal without signing out
  };

  const handleSearch = () => {
    const lowerCaseQuery = query.toLowerCase();

    if (lowerCaseQuery.includes('ticket')) {
      navigate('/tickets'); // Navigate to the /tickets route
    } else if (lowerCaseQuery.includes('prediction')) {
      navigate('/predictions'); // Navigate to the /predictions route
    } else if (lowerCaseQuery.includes('tracking')) {
      navigate('/tracking'); // Navigate to the /tracking route
    } else {
      alert('Please enter a valid search term.');
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logImage} alt="Logo" className="h-12" />
        <span className="ml-3 text-2xl font-bold text-blue-800">GO BY RAIL</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mx-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Search tickets, predictions, tracking"
          className="bg-gray-100 outline-none flex-grow text-sm px-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex space-x-6 items-center">
        <Link to="/home" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link to="/Tickets" className="text-gray-700 hover:text-blue-500">
          Tickets
        </Link>
        <Link to="/predictions" className="text-gray-700 hover:text-blue-500">
          Predictions
        </Link>
        <Link to="/live-tracking" className="text-gray-700 hover:text-blue-500">
          Tracking
        </Link>
      </nav>

      {/* Profile Icon */}
      <div className="relative">
        <div
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className="bg-white rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
          </svg>
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className="absolute right-0 mt-2 w-50 bg-white text-black rounded-lg shadow-lg p-4 z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gray-400 rounded-full h-10 w-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Kalum Perera</p>
                <p className="text-xs text-gray-400">kalum.perera@gmail.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* Sign Out Confirmation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 9999 }} // Ensure it is above other elements
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Log Out</h2>
            <p className="mb-4">Are you sure you want to Log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={cancelSignOut}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={confirmSignOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
