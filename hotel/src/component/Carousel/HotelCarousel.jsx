import React, { useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import abhotel1 from "../../assets/images/home-pillow-bed.jpg";

const HotelCarousel = ({ category }) => {
  const data = {
    tab1: [
      {
        id: 1,
        image: abhotel1,
        title: "Gym facilities for a healthy lifestyle",
        caption:
          "State-of-the-art gym equipment and personal trainers available.",
      },
      {
        id: 2,
        image: abhotel1,
        title: "Yoga & Meditation",
        caption: "Calm spaces for relaxation and mindfulness sessions.",
      },
    ],
    tab2: [
      {
        id: 1,
        image: abhotel1,
        title: "Hospitality & Care",
        caption: "24/7 medical assistance available within hotel premises.",
      },
      {
        id: 2,
        image: abhotel1,
        title: "Nearby Hospitals",
        caption: "Partnered with reputed hospitals for emergencies.",
      },
    ],
    tab3: [
      {
        id: 1,
        image: abhotel1,
        title: "Poolside Relaxation",
        caption: "Infinity pool with stunning views of the city skyline.",
      },
      {
        id: 2,
        image: abhotel1,
        title: "Kids Pool",
        caption: "Safe and fun water play area for children.",
      },
    ],
  };

  const slides = data[category] || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-6">
      {slides.length > 0 && (
        <ul className="flex bg-black p-5 rounded-3xl">
          <li className="w-1/2">
            <img
              className="md:h-90 h-70 w-full rounded-3xl border border-gray-100 shadow-xl"
              src={slides[currentIndex].image}
              alt="Hotel"
            />
          </li>
          <li className="w-1/2 px-6">
            <div className="md:h-80 h-60">
              <h4 className="text-2xl font-medium text-left text-white mb-4">
                {slides[currentIndex].title}
              </h4>
              <p className="text-sm font-medium text-left text-gray-300 mb-4">
                {slides[currentIndex].caption}
              </p>
            </div>

            {/* Arrow Buttons */}
            <div className="flex float-right md:gap-4 gap-2 ">
              <button
                onClick={prevSlide}
                className="bg-white border-2 rounded-full p-1 md:p-3 shadow hover:bg-gray-100 cursor-pointer border-gray-200 shadow-gray-400 "
              >
                <FaArrowLeftLong className="text-black text-base md:text-xs" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-black border-2 rounded-full p-1 md:p-3 shadow hover:bg-gray-800 cursor-pointer border-gray-200 shadow-gray-400 "
              >
                <FaArrowRightLong className="text-white text-base md:text-xs" />
              </button>
            </div>

            {/* Slide Number Navigation */}
            <span className="text-sm font-semibold text-gray-300 mt-1 md:mt-2 flex">
              {currentIndex + 1} / {slides.length}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HotelCarousel;
