import React, { useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import testimonialt_img from "../assets/images/testimonial.jpeg";

const Testimonials = () => {
  const slides = [
    {
      id: 1,
      image: testimonialt_img,
      title: "Mr. Rajesh Kumar",
      caption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      image: testimonialt_img,
      title: "Mrs. Neha Sharma",
      caption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      image: testimonialt_img,
      title: "Mr. Sandeep Verma",
      caption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
    <div className="border-b-3 border-gray-300 p-3 rounded-b-full col-span-12 md:col-span-4 bg-white md:mb-30">
      <div className="max-w-[75%] mx-auto md:mt-8 md:mb-10 relative">
        {/* Caption */}
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-black mb-8">
            {slides[currentIndex].caption}
          </p>
          <div className="flex gap-2.5 justify-center items-center">
            <img className="w-12 h-12 rounded-full" src={slides[currentIndex].image} title={slides[currentIndex].title} />
            <h4 className="text-md font-bold text-gray-700">
            {slides[currentIndex].title}
          </h4>
          </div>
          
        </div>

        {/* Navigation Arrows */}
        <div className="hidden justify-between mt-4">
          <button
            onClick={prevSlide}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          >
            <FaArrowLeftLong className="text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          >
            <FaArrowRightLong className="text-black" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-4 space-x-2">
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
    </div>
  );
};

export default Testimonials;
