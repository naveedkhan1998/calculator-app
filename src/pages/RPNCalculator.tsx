import React, { useState } from "react";

const RPNCalculator: React.FC = () => {
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
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">RPN Calculator</h1>
      <div>
        <input type="text" value={display} readOnly className="border p-2 mb-4 w-full text-right text-xl" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[..."0123456789"].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className="p-4 bg-gray-200 hover:bg-gray-300 text-xl rounded-lg transition-colors duration-200">
            {num}
          </button>
        ))}
        <button onClick={handleEnter} className="p-4 bg-yellow-200 hover:bg-yellow-300 text-xl rounded-lg col-span-2 transition-colors duration-200">
          Enter
        </button>
        {["+", "-", "*", "/"].map((op) => (
          <button key={op} onClick={() => handleOperator(op)} className="p-4 bg-blue-200 hover:bg-blue-300 text-xl rounded-lg transition-colors duration-200">
            {op}
          </button>
        ))}
        <button onClick={handleClear} className="p-4 bg-red-200 hover:bg-red-300 text-xl rounded-lg col-span-2 transition-colors duration-200">
          Clear
        </button>
      </div>
    </div>
  );
};

export default RPNCalculator;
