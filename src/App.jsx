import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
