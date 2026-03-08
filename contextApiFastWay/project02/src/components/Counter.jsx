import { useState } from "react";

function Counter() {
  const MX = 20;
  const MIN = 0;

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => (prev < MX ? prev + 1 : prev));
  };

  const decrement = () => {
    setCount(prev => (prev > MIN ? prev - 1 : prev));
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold uppercase">Product Counter</h1>

      <h2 className="mt-3 text-3xl font-black mb-3">{count}</h2>

      <button
        onClick={increment}
        disabled={count === MX}
        className={`p-3 text-white mr-1.5 rounded-2xl
          ${count === MX
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-900 hover:bg-amber-800"}
        `}
      >
        +
      </button>

      <button
        onClick={decrement}
        disabled={count === MIN}
        className={`p-3 text-white mr-1.5 rounded-2xl
          ${count === MIN
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-900 hover:bg-amber-800"}
        `}
      >
        -
      </button>
    </div>
  );
}

export default Counter;
