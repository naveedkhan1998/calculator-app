import React, { useState } from "react";
import InfixCalculator from "./pages/InfixCalculator";
import RPNCalculator from "./pages/RPNCalculator";
import INFIXFULLCalculator from "./pages/INFIXFULLCalculator";

function App() {
  const [activeTab, setActiveTab] = useState("infix");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <header className="w-full py-4 bg-blue-600 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">Calculator App</h1>
      </header>
      <nav className="flex space-x-4 py-4">
        {["infix", "rpn", "infixfull"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded transition-colors duration-200 ${activeTab === tab ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-blue-100"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
      <main className="flex flex-col p-8 w-full max-w-6xl">
        {activeTab === "infix" && (
          <section className="flex-1">
            <InfixCalculator />
          </section>
        )}
        {activeTab === "rpn" && (
          <section className="flex-1">
            <RPNCalculator />
          </section>
        )}
        {activeTab === "infixfull" && (
          <section className="flex-1">
            <INFIXFULLCalculator />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
