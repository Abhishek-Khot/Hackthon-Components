import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Resume from "./components/BarChart";
import SocialLinks from "./components/SocialLinks";
import Name from "./components/Name";
import PortfolioLandingPage from "./components/PortfolioLandingPage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LineChartComponent from "./components/BarChart";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");

  // Initialize Google Generative AI with API key from .env
  const genAI = new GoogleGenerativeAI("AIzaSyAZgfRm-nr_hzO3lwMvLdiirIAtAXjBtAw");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are a helpful assistant. Respond to this query: ${searchTerm}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setGeminiResponse(response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setGeminiResponse("Failed to fetch response. Please try again.");
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="mt-16">
        <Routes>
          {/* Root route for PortfolioLandingPage */}
          <Route path="/" element={<PortfolioLandingPage />} />
          <Route path="/home" element={<PortfolioLandingPage />} />

          {/* Search route */}
          <Route
            path="/search"
            element={
              <>
                {/* Search Bar */}
                <div className="h-40 flex flex-col items-center justify-center bg-white-900 shadow-md">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ask anything..."
                    className="border-2 border-gray-300 rounded-full px-6 py-3 w-3/4 md:w-1/2 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 text-gray-700 shadow-sm transition-all duration-200"
                  />
                  <button
                    onClick={handleSearch}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Search
                  </button>
                </div>

                {/* Home Component */}
                <Home geminiResponse={geminiResponse} />
              </>
            }
          />

          {/* Other routes */}
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Name />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/barchart" element={<LineChartComponent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/social-links" element={<SocialLinks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;