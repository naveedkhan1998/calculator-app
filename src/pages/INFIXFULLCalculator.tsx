import React, { useState } from "react";

// Helper function to get operator precedence
const getPrecedence = (op: string) => {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/") return 2;
  return 0;
};

// Helper function to apply an operator to two numbers
const applyOperator = (a: number, b: number, op: string) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return 0;
  }
};

// Function to evaluate an infix expression
const evaluateExpression = (expression: string) => {
  const ops: string[] = [];
  const values: number[] = [];

  let i = 0;
  while (i < expression.length) {
    if (expression[i] === " ") {
      i++;
      continue;
    }

    if (expression[i] >= "0" && expression[i] <= "9") {
      let buffer = "";
      while (i < expression.length && expression[i] >= "0" && expression[i] <= "9") {
        buffer += expression[i++];
      }
      values.push(parseInt(buffer, 10));
      continue;
    }

    if (expression[i] === "(") {
      ops.push(expression[i]);
    } else if (expression[i] === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") {
        const val2 = values.pop();
        const val1 = values.pop();
        const op = ops.pop();
        values.push(applyOperator(val1!, val2!, op!));
      }
      ops.pop();
    } else if (["+", "-", "*", "/"].includes(expression[i])) {
      while (ops.length && getPrecedence(ops[ops.length - 1]) >= getPrecedence(expression[i])) {
        const val2 = values.pop();
        const val1 = values.pop();
        const op = ops.pop();
        values.push(applyOperator(val1!, val2!, op!));
      }
      ops.push(expression[i]);
    }
    i++;
  }

  while (ops.length) {
    const val2 = values.pop();
    const val1 = values.pop();
    const op = ops.pop();
    values.push(applyOperator(val1!, val2!, op!));
  }

  return values[0];
};

const INFIXFULLCalculator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("0");
  const [currentNumber, setCurrentNumber] = useState("");

  const handleNumber = (key: string) => {
    const newExpression = expression + key;
    const newNumber = currentNumber + key;
    setExpression(newExpression);
    setCurrentNumber(newNumber);
    setDisplay(newNumber);
  };

  const handleOperator = (key: string) => {
    const newExpression = expression + key;
    setExpression(newExpression);
    setCurrentNumber("");
  };

  const handleParenthesis = (key: string) => {
    const newExpression = expression + key;
    setExpression(newExpression);
    setCurrentNumber("");
  };

  const handleClear = () => {
    setExpression("");
    setDisplay("0");
    setCurrentNumber("");
  };

  const handleEqual = () => {
    try {
      const result = evaluateExpression(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
      setCurrentNumber(result.toString());
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      setCurrentNumber("");
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 shadow-lg rounded-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
      <h1 className="text-4xl font-extrabold mb-2 text-center">INFIX FULL Calculator</h1>
      <p className="text-lg text-center mb-6">
        Expression: <span className="font-bold">{expression}</span>
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
        {["(", ")"].map((par) => (
          <button
            key={par}
            onClick={() => handleParenthesis(par)}
            className={`p-6 rounded-lg transition-colors duration-200 shadow-sm ${darkMode ? "bg-green-700 hover:bg-green-600" : "bg-green-400 hover:bg-green-500"} text-2xl text-white`}
          >
            {par}
          </button>
        ))}
        <button
          onClick={handleEqual}
          className={`p-6 rounded-lg col-span-2 transition-colors duration-200 shadow-sm ${darkMode ? "bg-yellow-700 hover:bg-yellow-600" : "bg-yellow-400 hover:bg-yellow-500"} text-2xl text-white`}
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

export default INFIXFULLCalculator;
