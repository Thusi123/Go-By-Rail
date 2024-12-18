import React from "react";
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaChartBar, FaMapMarkerAlt } from "react-icons/fa"; // Import icons
import Header from "./Header";
import Footer from "./Footer";
import HomeImage from '../assets/09.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="px-8 py-12">
        {/* Hero Section */}
        <section className="relative w-full h-96">
          <img
            src={HomeImage}
            alt="Railway Background"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
              <p className="text-lg">Where to next?</p>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Book Tickets */}
            <Link to="/tickets" className="block">
            <div className="bg-gray-100 hover:bg-blue-100 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaTicketAlt className="text-4xl text-blue-500 mb-2" />
              <h3 className="text-lg font-bold">Book Tickets</h3>
              <p className="text-gray-600">Find your next trip</p>
            </div>
            </Link>
            {/* Crowd Predictions */}
            <Link to="/predictions" className="block">
            <div className="bg-gray-100 hover:bg-blue-100 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaChartBar className="text-4xl text-blue-500 mb-2" />
              <h3 className="text-lg font-bold">Crowd Predictions</h3>
              <p className="text-gray-600">Find the best train</p>
            </div>
            </Link>
            {/* Live Tracking */}
            <Link to="/live-tracking" className="block">
            <div className="bg-gray-100 hover:bg-blue-100 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaMapMarkerAlt className="text-4xl text-blue-500 mb-2" />
              <h3 className="text-lg font-bold">Live Tracking</h3>
              <p className="text-gray-600">See where your train is</p>
            </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
