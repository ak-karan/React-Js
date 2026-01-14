import React, { useCallback, useEffect, useRef, useState } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowd, setNumberAllowd] = useState(false);
  const [charAllowd, setCharAllowd] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerators = useCallback(() => {
    let passs = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowd) str += "0123456789";
    if (charAllowd) str += "$%&@#*+=<>~^";
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      passs += str.charAt(charIndex);
    }
    setPassword(passs);
  }, [length, numberAllowd, charAllowd, setPassword]);

  const copyPasswordtoclip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [password]);

  useEffect(() => {
    passwordGenerators();
  }, [length, numberAllowd, charAllowd, passwordGenerators]);

  return (
    <div className="bg-gray-900 max-w-lg mt-8 mx-auto rounded-3xl text-white text-center p-4">
      <div className="font-bold text-3xl uppercase">Password Generator</div>
      <div className="px-4">
        <input
          type="text"
          className="bg-white text-gray-800 px-3 py-1 mt-6 w-full outline-none border-0"
          placeholder="Password Generator"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordtoclip}
          className={`px-3 w-full py-1 border border-gray-700 transition-all duration-300
          ${copied ? "bg-green-600" : "bg-blue-800"}`}
        >
          {copied ? "✔ Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4 text-sm">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={12}
            className="cursor-pointer transform-3d"
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowd}
            onChange={() => {
              setNumberAllowd((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="charAllowed"
            checked={charAllowd}
            onChange={() => setCharAllowd((prev) => !prev)}
          />
          <label htmlFor="charAllowed">Characters</label>
        </div>

        <div className="flex items-center gap-x-1">
          <button
            onClick={passwordGenerators}
            className="bg-green-700 disabled:opacity-50 px-3 py-1 cursor-pointer active:bg-green-600"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
