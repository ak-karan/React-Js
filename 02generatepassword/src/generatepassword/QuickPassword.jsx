import { useCallback, useState, useEffect, useRef } from "react"

export default function QuickPassword () {
    const [length, setLength] = useState (8)
    const [numberAccess, setNumberAccess] = useState (false)
    const [characterAccess, setCharacterAccess] = useState (false)
    const [passwordAccess, setPasswordAccess] = useState ("")
    const passwordRef = useRef(null)

    const generatePassword = useCallback(() =>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAccess) str += "0123456789";
        if (characterAccess) str += "!@#$%&*(){}[]|`_;:,./-=?";

        for (let i = 1; i <= length; i++) {
            let charIndex = Math.floor(Math.random() * str.length);
            pass += str.charAt(charIndex);
        }
        setPasswordAccess(pass)
    }, [length, numberAccess, characterAccess, setPasswordAccess]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(passwordAccess);
    }, [passwordAccess]);

    useEffect(() => {
    generatePassword();
    }, [length, numberAccess, characterAccess, generatePassword]);
    return(
        <>
            <div className="w-full max-w-xl bg-slate-700 text-white mx-auto justify-center items-center shadow rounded-xl px-4 py-8 my-8">
                <h1 className="text-3xl text-center mx-auto uppercase text-shadow-xs text-shadow-amber-300">Password Generated</h1><br />
                <div className="flex shadow rounded-lg overflow-hidden mb-4">
                    
                    <input 
                    type="text" 
                    id="" 
                    className="outline-none w-full py-1 px-3 bg-white text-slate-700 border border-solid border-white"
                    value={passwordAccess}
                    placeholder="Copy Password"
                    readOnly
                    ref={passwordRef}
                    />
                    <button onClick={copyPasswordToClipboard} className="text-white bg-slate-950 shadow px-3 py-0.5 shrink-0 cursor-pointer border border-solid border-white rounded-r-xl hover:bg-sky-700 transition-colors"
                    >
                        Copy
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row text-xl gap-y-4 sm:gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <input
                            type="range"
                            id="Range"
                            min={8}
                            max={16}
                            value={length}
                            className="cursor-pointer"
                            onChange={(e) => { setLength(Number(e.target.value)) }}
                        />
                        <label htmlFor="Range">Length: {length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            id="Numbers"
                            checked={numberAccess}
                            onChange={() => { setNumberAccess((prev) => !prev); }}
                        />
                        <label htmlFor="Numbers">Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            id="characters"
                            checked={characterAccess}
                            onChange={() => { setCharacterAccess((prev) => !prev); }}
                        />
                        <label htmlFor="characters">Characters</label>
                    </div>
                </div>
                
            </div>
        </>
    )
}