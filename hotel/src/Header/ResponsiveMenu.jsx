import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { NavbarMenu } from "./NavbarData.js";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go"; 

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{duration: 0.3}}
          className="absolute top-12 left-0 w-full bg-white shadow-md z-20 md:hidden"
        >
          <div className="text-xl p-10 m-6 bg-gray-900 text-white font-semibold rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-8">
              {NavbarMenu.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-amber-600 capitalize"
                >
                  <Link to={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="flex items-center gap-2 justify-center mt-6">
              <button className="flex items-center gap-2 bg-black hover:bg-white text-white font-medium px-4 py-2 rounded-full transition hover:text-black border-2 cursor-pointer text-sm">
                Book Now
                <GoArrowUpRight className="text-lg bg-white text-black rounded-full p-1" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
