import { useState } from "react";

function BgChanger() {
  const [color, setColor] = useState("black");

  const colors = [
    { name: "Pink", value: "pink" },
    { name: "Red", value: "red" },
    { name: "Orange", value: "orange" },
    { name: "Yellow", value: "yellow" },
    { name: "African violet", value: "#B284BE" },
    { name: "Alizarin", value: "#DB2D43" },
    { name: "Almond", value: "#EED9C4" },
    { name: "Amazon", value: "#3B7A57" },
    { name: "Antique bronze", value: "#665D1E" },
    { name: "Barn red", value: "#7C0A02" },
  ];

  // return (
  //   <div
  //     className="w-full h-screen duration-300"
  //     style={{ backgroundColor: color }}
  //   >
  //     {/* Current color name */}
  //     <div className="text-white text-center pt-6 text-5xl font-bold uppercase">
  //       Background: {color}
  //     </div>

  //     <div className="fixed flex bottom-14 justify-center items-center inset-x-0 px-2">
  //       <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white rounded-sm px-2.5 py-1.5">
  //         {colors.map((item) => (
  //           <button
  //             key={item.value}
  //             onClick={() => setColor(item.value)}
  //             className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
  //             style={{ backgroundColor: item.value }}
  //           >
  //             {item.name}
  //           </button>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div
      className="w-full h-screen duration-300"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex bottom-14 justify-center items-center inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white rounded-sm px-2.5 py-1.5">
          <button
            type="button"
            onClick={() => setColor("Pink")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "pink" }}
          >
            Pink
          </button>
          <button
            type="button"
            onClick={() => setColor("red")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>
          <button
            type="button"
            onClick={() => setColor("Orange")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "Orange" }}
          >
            Orange
          </button>
          <button
            type="button"
            onClick={() => setColor("black")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "black" }}
          >
            Black
          </button>
          <button
            type="button"
            onClick={() => setColor("yellow")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "yellow" }}
          >
            Yellow
          </button>
          <button
            type="button"
            onClick={() => setColor("#B284BE")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "#B284BE" }}
          >
            African violet
          </button>
          <button
            type="button"
            onClick={() => setColor("#DB2D43")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "#DB2D43" }}
          >
            Alizarin
          </button>
          <button
            type="button"
            onClick={() => setColor("#EED9C4")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "#EED9C4" }}
          >
            Almond
          </button>
          <button
            type="button"
            onClick={() => setColor("#3B7A57")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "#3B7A57" }}
          >
            Amazon
          </button>
          <button
            type="button"
            onClick={() => setColor("#665D1E")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: "#665D1E" }}
          >
            Antique bronze
          </button>
        </div>
      </div>
    </div>
  );
}

export default BgChanger;
