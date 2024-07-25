import React, { useState } from "react";

const InfixCalculator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [state, setState] = useState("initial");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [operator, setOperator] = useState("");
  const [display, setDisplay] = useState("0");

  const handleNumber = (key: string) => {
    if (state === "initial" || state === "result") {
      setN1(key);
      setDisplay(key);
      setState("input1");
    } else if (state === "input1") {
      setN1(n1 + key);
      setDisplay(n1 + key);
    } else if (state === "operator") {
      setN2(key);
      setDisplay(key);
      setState("input2");
    } else if (state === "input2") {
      setN2(n2 + key);
      setDisplay(n2 + key);
    }
  };

  const handleOperator = (key: string) => {
    if (state === "input1" || state === "result") {
      setOperator(key);
      setState("operator");
    } else if (state === "input2") {
      const result = applyOperator(n1, operator, n2);
      setN1(result.toString());
      setOperator(key);
      setN2("");
      setState("operator");
      setDisplay(result.toString());
    }
  };

  const handleEquals = () => {
    if (state === "input2") {
      const result = applyOperator(n1, operator, n2);
      setN1(result.toString());
      setState("result");
      setDisplay(result.toString());
    } else if (state === "result") {
      const result = applyOperator(n1, operator, n2);
      setN1(result.toString());
      setDisplay(result.toString());
    }
  };

  const handleClear = () => {
    setN1("");
    setN2("");
    setOperator("");
    setState("initial");
    setDisplay("0");
  };

  const applyOperator = (n1: string, operator: string, n2: string) => {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return 0;
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 shadow-lg rounded-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <h1 className="text-4xl font-extrabold mb-2 text-center">Infix Calculator</h1>
      <p className="text-lg text-center mb-6">
        State: <span className="font-bold">{state}</span>
      </p>
      <div className="mb-4">
        <input
          type="text"
          value={display}
          readOnly
          className={`border-2 p-4 w-full text-right text-3xl rounded-lg shadow-sm ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[..."0123456789"].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num)}
            className={`p-6 rounded-lg transition-colors duration-200 shadow-sm ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} text-2xl`}
          >
            {num}
          </button>
        ))}
        {["+", "-", "*", "/"].map((op) => (
          <button
            key={op}
            onClick={() => handleOperator(op)}
            className={`p-6 rounded-lg transition-colors duration-200 shadow-sm ${darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-400 hover:bg-blue-500"} text-2xl text-white`}
          >
            {op}
          </button>
        ))}
        <button
          onClick={handleEquals}
          className={`p-6 rounded-lg col-span-2 transition-colors duration-200 shadow-sm ${darkMode ? "bg-green-700 hover:bg-green-600" : "bg-green-400 hover:bg-green-500"} text-2xl text-white`}
        >
          =
        </button>
        <button
          onClick={handleClear}
          className={`p-6 rounded-lg col-span-2 transition-colors duration-200 shadow-sm ${darkMode ? "bg-red-700 hover:bg-red-600" : "bg-red-400 hover:bg-red-500"} text-2xl text-white`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default InfixCalculator;
