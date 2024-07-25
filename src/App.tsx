// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import InfixCalculator from "./pages/InfixCalculator";
import INFIXFULLCalculator from "./pages/INFIXFULLCalculator";
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
            <Link to="/infix-full" className="hover:underline">
              INFIX FULL Calculator
            </Link>
          </nav>
        </header>
        <main className="container mx-auto flex-grow p-4">
          <Routes>
            <Route path="/" element={<InfixCalculator />} />
            <Route path="/rpn" element={<RPNCalculator />} />
            <Route path="/infix-full" element={<INFIXFULLCalculator />} />
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
