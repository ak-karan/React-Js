import React, { useState } from "react";
import { CiCoins1 } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { FiMapPin } from "react-icons/fi";

const SearchBoxMain = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    guests: "2 Adults",
    priceRange: "1000 - 2500",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search data:", searchData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mt-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Location Input */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-lg">
                <FiMapPin />{" "}
              </span>
              <input
                type="text"
                name="location"
                value={searchData.location}
                onChange={handleInputChange}
                placeholder="Dehradun, Uttarakhand"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:black"
              />
            </div>
          </div>

          {/* Guests Select */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              For
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-950 text-lg">
                <GoPeople />
              </span>
              <select
                name="guests"
                value={searchData.guests}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:black appearance-none"
              >
                <option>2 Adults</option>
                <option>1 Adult</option>
                <option>3 Adults</option>
                <option>4 Adults</option>
                <option>Family</option>
              </select>
            </div>
          </div>

          {/* Price Range Select */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-lg">
                <CiCoins1 />
              </span>
              <select
                name="priceRange"
                value={searchData.priceRange}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:black appearance-none"
              >
                <option>1000 - 2500</option>
                <option>2500 - 5000</option>
                <option>5000 - 10000</option>
                <option>10000+</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto mt-4 md:mt-6">
            <button
              type="submit"
              className="w-full bg-black hover:bg-white hover:text-black border-2 text-white font-medium py-2 px-6 rounded-md transition duration-300 cursor-pointer"
            >
              Search Hotel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBoxMain;
