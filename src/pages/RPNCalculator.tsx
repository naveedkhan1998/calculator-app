import React, { useState } from "react";

const RPNCalculator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [state, setState] = useState("initial");
  const [n1, setN1] = useState("");
  const [stack, setStack] = useState<number[]>([]);
  const [display, setDisplay] = useState("0");

  const handleNumber = (key: string) => {
    if (state === "initial" || state === "operate") {
      setN1(key);
      setDisplay(key);
      setState("input1");
    } else if (state === "input1") {
      setN1(n1 + key);
      setDisplay(n1 + key);
    }
  };

  const handleEnter = () => {
    if (state === "input1" && n1 !== "") {
      const newStack = [...stack, parseFloat(n1)];
      setStack(newStack);
      setN1("");
      setDisplay(n1);
      setState("initial");
    }
  };

  const handleOperator = (key: string) => {
    let newStack = stack;
    if (state === "input1" && n1 !== "") {
      newStack = [...stack, parseFloat(n1)];
      setStack(newStack);
      setN1("");
    }

    if (newStack.length >= 2) {
      const n2 = newStack.pop()!;
      const n1 = newStack.pop()!;
      const result = applyOperator(n1, key, n2);
      newStack.push(result); // Append the result to the stack
      setStack(newStack);
      setDisplay(result.toString());
      setState("operate");
    }
  };

  const handleClear = () => {
    setN1("");
    setStack([]);
    setState("initial");
    setDisplay("0");
  };

  const applyOperator = (n1: number, operator: string, n2: number) => {
    switch (operator) {
      case "+":
        return n1 + n2;
      case "-":
        return n1 - n2;
      case "*":
        return n1 * n2;
      case "/":
        return n1 / n2;
      default:
        return 0;
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 shadow-lg rounded-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <h1 className="text-4xl font-extrabold mb-2 text-center">RPN Calculator</h1>
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
        <button
          onClick={handleEnter}
          className={`p-6 rounded-lg col-span-2 transition-colors duration-200 shadow-sm ${darkMode ? "bg-yellow-700 hover:bg-yellow-600" : "bg-yellow-400 hover:bg-yellow-500"} text-2xl`}
        >
          Enter
        </button>
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
          onClick={handleClear}
          className={`p-6 rounded-lg col-span-2 transition-colors duration-200 shadow-sm ${darkMode ? "bg-red-700 hover:bg-red-600" : "bg-red-400 hover:bg-red-500"} text-2xl text-white`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default RPNCalculator;
