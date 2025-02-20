import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, FaProjectDiagram, FaBlog, FaFileAlt, FaEnvelope, FaSearch, FaLink } from 'react-icons/fa';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-white fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
          SmartTrack
        </Link>

        {/* Navigation Links */}
        <ul className="grid grid-cols-10 gap-2 w-full text-gray text-center">
          <li className="group">
            <Link 
              to="/home" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaHome className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Home</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/profile" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaUser className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Profile</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/about" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaInfoCircle className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">About</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/projects" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaProjectDiagram className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Projects</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/blogs" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaBlog className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Blogs</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/contact" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaEnvelope className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Contact</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/social-links" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaLink className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Social Links</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/barchart" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaChartLine className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Treads</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/search" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-blue-100 hover:shadow-lg">
              <FaWandMagicSparkles className="text-lg group-hover:text-blue-400" />
              <span className="text-xs group-hover:text-blue-400">Smart Assist</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;