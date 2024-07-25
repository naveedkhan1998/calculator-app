import { useState, useEffect } from "react";
import { Sun, Moon, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InfixCalculator from "./pages/InfixCalculator";
import RPNCalculator from "./pages/RPNCalculator";
import INFIXFULLCalculator from "./pages/INFIXFULLCalculator";

const App = () => {
  const [activeTab, setActiveTab] = useState("infix");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const tabs = [
    { id: "infix", label: "Infix" },
    { id: "rpn", label: "RPN" },
    { id: "infixfull", label: "Infix Full" },
  ];
  //@ts-expect-error all is well
  const getComponent = (tab) => {
    switch (tab) {
      case "infix":
        return <InfixCalculator darkMode={darkMode} />;
      case "rpn":
        return <RPNCalculator darkMode={darkMode} />;
      case "infixfull":
        return <INFIXFULLCalculator darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <header className={`w-full py-6 ${darkMode ? "bg-gray-800" : "bg-blue-600"} text-white shadow-lg`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Calculator className="mr-2" />
            Calculator App
          </h1>
          <button
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors duration-200"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id ? "bg-blue-500 text-white" : darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-blue-500 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`bg-white ${darkMode ? "bg-gray-800" : "bg-blue-600"} rounded-lg shadow-xl p-6`}
          >
            {getComponent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className={`w-full py-4 ${darkMode ? "bg-gray-800" : "bg-blue-600"} text-white text-center`}>
        <p>&copy; 2024 Calculator App HCI Assignment. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
