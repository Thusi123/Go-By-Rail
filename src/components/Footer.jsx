import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import Logo from "../assets/Logo.png"; // Ensure the correct path to the logo file

const Footer = () => {
  return (
    <motion.footer
      className="bg-indigo-800 text-white py-6" // Reduced height
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
        {/* Left Section */}
        <motion.div
          className="flex flex-col items-center lg:items-start space-y-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img src={Logo} alt="Go By Rail Logo" className="w-12 lg:w-16" />
          <h2 className="text-lg lg:text-xl font-bold text-withe">Go By Rail</h2>
          <p className="text-base text-gray-300 max-w-xs text-center lg:text-left">
            Your trusted partner for seamless and smart rail journeys.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          className="grid grid-cols-2 gap-4 lg:gap-6 text-center lg:text-left"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="#about" className="text-base text-gray-300 hover:text-yellow-300 hover:underline transition">About Us</a>
          <a href="#mobile" className="text-base text-gray-300 hover:text-yellow-300 hover:underline transition">Mobile</a>
          <a href="#privacy" className="text-base text-gray-300 hover:text-yellow-300 hover:underline transition">Privacy</a>
          <a href="#terms" className="text-base text-gray-300 hover:text-yellow-300 hover:underline transition">Terms of Use</a>
          <a href="#career" className="text-base text-gray-300 hover:text-yellow-300 hover:underline transition">Careers</a>
          <a href="#support" className="text-base text-gray-300 hover:text-yellow-300 hover:underline transition">Customer Support</a>
        </motion.nav>

        {/* Newsletter Section */}
        <motion.div
          className="w-full lg:w-auto text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg lg:text-xl font-semibold mb-2 text-yellow-300">Stay Connected</h3>
          <p className="text-base text-gray-300 mb-4">
            Subscribe to our newsletter for travel updates, deals, and tips.
          </p>
          <form className="flex flex-col lg:flex-row items-center lg:items-stretch space-y-3 lg:space-y-0 lg:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-auto p-3 rounded-lg focus:outline-none text-gray-800 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer Bottom Section */}
      <motion.div
        className="mt-2 border-t border-gray-700 pt-2 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        © {new Date().getFullYear()} Go By Rail. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
