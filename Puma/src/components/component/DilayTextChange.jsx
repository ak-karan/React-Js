import { useState, useEffect } from "react"

export default function DilayTextChange() {
    const [crose, setCrose] = useState (true)
    
    const hideButtonTop = () => {
        setCrose(!crose);
    }
    
    const [dilayText, setDilayText] = useState("PUMA 👟")
    const changedText = [
        'EXTRA 5% OFF AND FREE SHIPPING ON ALL ONLINE PAYMENTS*',
        'FREE RETURNS AND FREE EXCHANGE.',
        'SOLVE YOUR QUERIES FASTER THAN EVER! SEND US A, Hi. ON WHATSAPP AT "6364929121"',
        '⚡1-DAY EXPRESS DELIVERY NOW AVAILABLE IN BANGALORE!'];
    const [currentTextChange, setCurrentTextChange] = useState(0)

    useEffect(() => {
    const timerId = setTimeout(() => {
      setDilayText(changedText[currentTextChange]);
      setCurrentTextChange((prevIndex) => (prevIndex + 1) % changedText.length);
    }, 2500);

    return () => clearTimeout(timerId);
  }, [currentTextChange, changedText]);

    return(
        <>
            {crose && (
                <div className="bg-white text-slate-900 text-base">
                    <p className="text-center font-semibold text-shadow-2xs text-base py-2.5">{dilayText}</p>
                </div>
            )}
            
            <button onClick={hideButtonTop} className="z-10 cursor-pointer right-0 rounded-full top-1 my-3 block bg-black p-1 text-xs absolute">{crose ? '❌' : '✔️'} </button>
            
        </>
    )
}