// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import InfixCalculator from "./pages/InfixCalculator";
import OtherCalculator2 from "./pages/OtherCalculator2";
import RPNCalculator from "./pages/RPNCalculator";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-around">
            <Link to="/" className="hover:underline">
              Infix Calculator
            </Link>
            <Link to="/rpn" className="hover:underline">
              RPN Calculator
            </Link>
            <Link to="/other2" className="hover:underline">
              Other Calculator 2
            </Link>
          </nav>
        </header>
        <main className="container mx-auto flex-grow p-4">
          <Routes>
            <Route path="/" element={<InfixCalculator />} />
            <Route path="/rpn" element={<RPNCalculator />} />
            <Route path="/other2" element={<OtherCalculator2 />} />
          </Routes>
        </main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>Calculator App © 2024</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
