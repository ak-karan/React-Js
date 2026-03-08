import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500 uppercase tracking-widest">
            Your Logo
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-medium">
            <li>
              <NavLink to="/" className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }>Contact</NavLink>
            </li>
            <li>
              <NavLink to="/github" className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }>GitHub</NavLink>
            </li>
          </ul>

          {/* Login/Register Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="px-4 py-2 border rounded hover:bg-gray-100 shadow-lg">
              Login
            </Link>
            <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col space-y-3 font-medium">
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
              <NavLink to="/github" onClick={() => setIsOpen(false)}>GitHub</NavLink>
            </ul>

            <div className="flex flex-col mt-4 space-y-2">
              <Link to="/" className="border px-4 py-2 rounded text-center">
                Login
              </Link>
              <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded text-center">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}