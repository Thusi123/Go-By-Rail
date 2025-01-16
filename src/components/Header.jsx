import React, { useState, useEffect } from "react";
import logImage from "../assets/Logo.png"; // Update path if necessary
import { Link, useNavigate } from "react-router-dom";
import translateText from "../components/translateText";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const [translatedTexts, setTranslatedTexts] = useState({
    home: "Home",
    buyTickets: "Buy Tickets",
    TrainPredictions: "Train Predictions",
    trainTracking: "Live Train Tracking",
    faqs: "FAQs",
    callUs: "Call Us",
  });

  const originalTexts = {
    home: "Home",
    buyTickets: "Buy Tickets",
    TrainPredictions: "Train Predictions",
    trainTracking: "Live Train Tracking",
    faqs: "FAQs",
    callUs: "Call Us",
  };

  useEffect(() => {
    const translateAllTexts = async () => {
      const updatedTexts = {};
      for (const [key, value] of Object.entries(originalTexts)) {
        updatedTexts[key] = await translateText(value, selectedLanguage);
      }
      setTranslatedTexts(updatedTexts);
    };

    translateAllTexts();
  }, [selectedLanguage]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowOptions(false);
  };

  const handleLogout = () => setIsModalOpen(true);
  const confirmSignOut = () => {
    setIsModalOpen(false);
    localStorage.removeItem("authToken");
    navigate("/login");
    window.location.reload();
  };
  const cancelSignOut = () => setIsModalOpen(false);

  const handleSearch = () => {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.includes("ticket")) {
      navigate("/tickets");
    } else if (lowerCaseQuery.includes("prediction")) {
      navigate("/predictions");
    } else if (lowerCaseQuery.includes("tracking")) {
      navigate("/live-tracking");
    } else {
      alert("Please enter a valid search term.");
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logImage} alt="Logo" className="h-12" />
        <span className="ml-3 text-2xl font-bold">GoByRail</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 mx-4 w-full max-w-lg shadow-md">
        <input
          type="text"
          placeholder="Search tickets, predictions, tracking"
          className="bg-transparent outline-none flex-grow text-gray-800 text-sm px-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="text-indigo-600 hover:text-purple-600">
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
        <Link to="/home" className="hover:underline">
          {translatedTexts.home}
        </Link>
        <Link to="/tickets" className="hover:underline">
          {translatedTexts.buyTickets}
        </Link>
        <Link to="/predictions" className="hover:underline">
          {translatedTexts.TrainPredictions}
        </Link>
        <Link to="/live-tracking" className="hover:underline">
          {translatedTexts.trainTracking}
        </Link>
      </nav>

      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="text-white font-medium hover:underline"
        >
          {selectedLanguage === "en" && "English"}
          {selectedLanguage === "si" && "සිංහල"}
          {selectedLanguage === "ta" && "தமிழ்"}
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 bg-white rounded shadow-md w-32 text-gray-800">
            {selectedLanguage !== "en" && (
              <button
                onClick={() => handleLanguageChange("en")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                English
              </button>
            )}
            {selectedLanguage !== "si" && (
              <button
                onClick={() => handleLanguageChange("si")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                සිංහල
              </button>
            )}
            {selectedLanguage !== "ta" && (
              <button
                onClick={() => handleLanguageChange("ta")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                தமிழ்
              </button>
            )}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative">
        <div
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className="bg-white rounded-full h-8 w-8 flex items-center justify-center cursor-pointer shadow-md"
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
        {showProfileDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-10">
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
    </header>
  );
};

export default Header;
