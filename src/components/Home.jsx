import React from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaChartBar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import HeroImage from "../assets/09.png"; // Hero section image

const Home = ({ translatedTexts }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header translatedTexts={translatedTexts} />

      {/* Main Section */}
      <main className="px-8 py-12">
        {/* Hero Section */}
        <section className="relative w-full h-[400px]">
          <motion.img
            src={HeroImage}
            alt="Railway Hero Background"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">Plan Your Journey</h1>
              <p className="text-lg">Discover the best trains, real-time tracking, and more!</p>
            </div>
          </motion.div>
        </section>

        {/* Quick Access Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Quick Access</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
            }}
          >
            {/* Book Tickets */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to="/tickets" className="block">
                <div className="bg-white hover:bg-indigo-200 text-gray-800 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg transition-transform">
                  <FaTicketAlt className="text-5xl text-indigo-600 mb-4" />
                  <h3 className="text-lg font-bold">Book Tickets</h3>
                  <p className="text-gray-600">Secure your journey now</p>
                </div>
              </Link>
            </motion.div>

            {/* Crowd Predictions */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to="/predictions" className="block">
                <div className="bg-white hover:bg-pink-200 text-gray-800 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg transition-transform">
                  <FaChartBar className="text-5xl text-pink-600 mb-4" />
                  <h3 className="text-lg font-bold">Crowd Predictions</h3>
                  <p className="text-gray-600">Choose the most comfortable train</p>
                </div>
              </Link>
            </motion.div>

            {/* Live Tracking */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to="/live-tracking" className="block">
                <div className="bg-white hover:bg-red-100 text-gray-800 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg transition-transform">
                  <FaMapMarkerAlt className="text-5xl text-red-500 mb-4" />
                  <h3 className="text-lg font-bold">Live Tracking</h3>
                  <p className="text-gray-600">Know your train's location in real-time</p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="mt-16 bg-gray-50 py-12 px-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">About Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our system helps commuters plan their journeys efficiently by providing real-time
              train tracking, crowd predictions, and ticket booking. We aim to make train travel
              in Sri Lanka smarter and more comfortable for everyone.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
