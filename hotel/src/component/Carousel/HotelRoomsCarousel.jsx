import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

import abhotel1 from "../../assets/images/some-delicious-meal-bed-bedroom-side-view.jpg";
import abhotel2 from "../../assets/images/some-delicious-meal-bed-bedroom-side-view.jpg";
import abhotel3 from "../../assets/images/some-delicious-meal-bed-bedroom-side-view.jpg";

const HotelRoomsCarousel = () => {
  const slides = [
    {
      id: 1,
      image: abhotel1,
      location: "Majuli, Assam",
      caption:
        "A versatile platform offering a wide range of hotel options and services.",
    },
    {
      id: 2,
      image: abhotel2,
      location: "Guwahati, Assam",
      caption:
        "Discover comfort, embrace relaxation, and indulge in luxury. Experience hospitality at its finest.",
    },
    {
      id: 3,
      image: abhotel3,
      location: "Shillong, Meghalaya",
      caption:
        "Experience breathtaking views and world-class service at our premium hotels.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="col-span-12 md:col-span-4 bg-white">
      <div className="max-w-[75%] mx-auto mt-8 mb-20 relative ">
        {/* Image */}
        <img
          className="w-full rounded-3xl"
          src={slides[currentIndex].image}
          alt="Hotel"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 p-2">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1 bg-black hover:bg-white text-white hover:text-black font-semibold px-3 py-2 rounded-full transition border-2 text-sm"
            >
              <FiMapPin />
              {slides[currentIndex].location}
            </Link>

            <Link to="/">
              <GoArrowUpRight className="md:text-3xl text-xl bg-gray-200 text-black rounded-full p-1" />
            </Link>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-3">
          <p className="text-sm font-semibold mb-3 text-left text-black max-w-[85%] h-15">
            {slides[currentIndex].caption}
          </p>
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -bottom-14 left-41 md:left-51 transform -translate-y-1/2 bg-white border-2 rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
        >
          <FaArrowLeftLong className="text-black text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -bottom-14 -right-0 transform -translate-y-1/2 bg-black border-2 rounded-full p-2 shadow hover:bg-gray-800 cursor-pointer"
        >
          <FaArrowRightLong  className="text-white text-xl" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="justify-center mt-4 space-x-2 hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-black scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelRoomsCarousel;
