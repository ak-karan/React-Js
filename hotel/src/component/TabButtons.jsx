import React, { useState } from "react";
import { LuSun } from "react-icons/lu";
import HotelCarousel from "./Carousel/HotelCarousel";

function TabsComponent() {
  const [activeTab, setActiveTab] = useState("tab1"); // Default active tab

  return (
    <div className="flex flex-col relative">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <div className="mr-3">
          <LuSun className="bg-sky-200 text-5xl p-1.5 rounded-full" />
        </div>
        <button
          onClick={() => setActiveTab("tab1")}
          className={`px-4 text-xs py-2 rounded-full ${
            activeTab === "tab1" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Gym
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={`px-4 text-xs py-2 rounded-full ${
            activeTab === "tab2" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Hospital
        </button>
        <button
          onClick={() => setActiveTab("tab3")}
          className={`px-4 text-xs py-2 rounded-full ${
            activeTab === "tab3" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Pool
        </button>
      </div>

      {/* Content */}
      <HotelCarousel category={activeTab} key={activeTab} />
    </div>
  );
}

export default TabsComponent;
