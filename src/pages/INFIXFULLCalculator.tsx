import React, { useState } from "react";

const INFIXFULLCalculator: React.FC = () => {
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
      const result = eval(expression);
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
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">INFIX FULL Calculator</h1>
      <div>
        <input type="text" value={display} readOnly className="border p-2 mb-4 w-full text-right text-xl" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[..."0123456789"].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className="p-4 bg-gray-200 hover:bg-gray-300 text-xl rounded-lg">
            {num}
          </button>
        ))}
        {["+", "-", "*", "/"].map((op) => (
          <button key={op} onClick={() => handleOperator(op)} className="p-4 bg-blue-200 hover:bg-blue-300 text-xl rounded-lg">
            {op}
          </button>
        ))}
        {["(", ")"].map((par) => (
          <button key={par} onClick={() => handleParenthesis(par)} className="p-4 bg-green-200 hover:bg-green-300 text-xl rounded-lg">
            {par}
          </button>
        ))}
        <button onClick={handleEqual} className="p-4 bg-yellow-200 hover:bg-yellow-300 text-xl rounded-lg col-span-2">
          =
        </button>
        <button onClick={handleClear} className="p-4 bg-red-200 hover:bg-red-300 text-xl rounded-lg col-span-2">
          Clear
        </button>
      </div>
    </div>
  );
};

export default INFIXFULLCalculator;
