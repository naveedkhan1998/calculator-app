import React, { useState } from "react";

const InfixCalculator: React.FC = () => {
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
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Infix Calculator</h1>
      <div>
        <input type="text" value={display} readOnly className="border p-2 mb-4 w-full text-right text-xl" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[..."0123456789"].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className="p-4 bg-gray-200 hover:bg-gray-300 text-xl rounded-lg transition-colors duration-200">
            {num}
          </button>
        ))}
        {["+", "-", "*", "/"].map((op) => (
          <button key={op} onClick={() => handleOperator(op)} className="p-4 bg-blue-200 hover:bg-blue-300 text-xl rounded-lg transition-colors duration-200">
            {op}
          </button>
        ))}
        <button onClick={handleEquals} className="p-4 bg-green-200 hover:bg-green-300 text-xl rounded-lg col-span-2 transition-colors duration-200">
          =
        </button>
        <button onClick={handleClear} className="p-4 bg-red-200 hover:bg-red-300 text-xl rounded-lg col-span-2 transition-colors duration-200">
          Clear
        </button>
      </div>
    </div>
  );
};

export default InfixCalculator;
