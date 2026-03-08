import React, { useState, useEffect } from "react";
import { RiHotelFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { NavbarMenu } from "./NavbarData.js";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import { IoIosSearch } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";
import { RiMenu4Fill } from "react-icons/ri";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10); // 10px scroll ke baad sticky effect
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`rounded-4xl opacity-95 fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isSticky
            ? "bg-white/90 backdrop-blur-md shadow-lg shadow-gray-600 scale-95"
            : "bg-transparent scale-100"
        }`}
      >
        <div className="max-w-7xl mx-auto py-3 flex justify-between items-center rounded-full px-4 md:px-12">
          {/* Logo Section */}
          <div className="text-2xl py-2 font-bold text-gray-800">
            <Link to="/" className="gap-3 flex items-center cursor-pointer">
              <RiHotelFill className="text-black" />
              <p className="text-base capitalize">Brand Name</p>
            </Link>
          </div>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex gap-6 items-center text-gray-800 text-sm font-semibold">
              {NavbarMenu.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-blue-600 capitalize transition-colors"
                >
                  <Link to={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search + Button */}
          <div className="flex gap-2 items-center justify-center">
            {/* Search Box */}
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50">
              <input
                type="text"
                placeholder="Search..."
                className="outline-none px-2 md:text-sm text-xs bg-transparent w-20 md:w-32"
              />
              <button>
                <IoIosSearch className="text-2xl text-gray-200 hover:text-black transition cursor-pointer p-1 bg-black hover:bg-gray-200 rounded-full" />
              </button>
            </div>
            {/* Button link */}
            <div className="hidden md:flex items-center gap-2 justify-center">
              <button className="flex items-center gap-2 bg-black hover:bg-white text-white font-medium px-4 py-1 rounded-full transition hover:text-black border-2 cursor-pointer text-xs">
                Book Now
                <GoArrowUpRight className="md:text-2xl text-xl bg-white text-black rounded-full p-1" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <RiMenu4Fill className="cursor-pointer text-3xl p-1 border-2 bg-slate-800 text-white shadow-lg shadow-blue-500/50 rounded-md" />
          </div>
        </div>
      </nav>

      {/* Push content down so it doesn't hide under navbar */}
      <div className="h-17"></div>
      <ResponsiveMenu open={open} />
    </>
  );
};

export default Navbar;
