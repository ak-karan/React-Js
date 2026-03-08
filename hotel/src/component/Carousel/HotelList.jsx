import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

import hotelRoomList1 from "../../assets/images/hotelroomlist-1.jpg";
import hotelRoomList2 from "../../assets/images/hotelroomlist-2.jpg";
import hotelRoomList3 from "../../assets/images/hotelroomlist-3.jpg";
import hotelRoomList4 from "../../assets/images/hotelroomlist-4.jpg";

const HotelList = () => {
  const RoomsList = [
    {
      id: 1,
      image: hotelRoomList1,
      location: "Majuli",
      price: "₹ 2500 per-day",
      title: "Cristal View Hotel",
      hotelUrl: "/",
    },
    {
      id: 2,
      image: hotelRoomList2,
      location: "Guwahati",
      price: "₹ 2800 per-day",
      title: "Lakeview Resort",
      hotelUrl: "/",
    },
    {
      id: 3,
      image: hotelRoomList3,
      location: "Shillong",
      price: "₹ 3000 per-day",
      title: "Hillside Inn",
      hotelUrl: "/",
    },
    {
      id: 4,
      image: hotelRoomList4,
      location: "Kolkata",
      price: "₹ 3500 per-day",
      title: "Urban Stay",
      hotelUrl: "/",
    },
    {
      id: 5,
      image: hotelRoomList1,
      location: "Delhi",
      price: "₹ 4000 per-day",
      title: "City Palace Hotel",
      hotelUrl: "/",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);

  // Responsive cards count
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // tablet
      } else {
        setVisibleCards(4); // desktop
      }
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const prevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? RoomsList.length - visibleCards : prev - 1
    );
  };

  const nextSlide = () => {
    setSlideIndex((prev) =>
      prev >= RoomsList.length - visibleCards ? 0 : prev + 1
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex md:flex p-4 gap-4 items-center">
          <p className="text-xs border-2 border-gray-200 bg-white py-1 px-6 rounded-3xl">
            Facilities
          </p>
          <h5 className="text-xl md:text-2xl font-semibold text-black">
            Explore Best Hotel
          </h5>
        </div>
        <div className="md:p-4">
          <div className="flex gap-2 items-center justify-center">
            {/* Search Box */}
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50">
              <input
                type="text"
                placeholder="Search..."
                className="outline-none px-2 md:text-sm text-xs bg-transparent w-55 md:w-90"
              />
              <button>
                <IoIosSearch className="text-2xl cursor-pointer p-1 text-black bg-gray-200 hover:bg-gray-400 rounded-full" />
              </button>
            </div>
            {/* Button link */}
            <div className="hidden md:flex items-center gap-2 justify-center">
              <button className="flex items-center gap-2 bg-black text-white font-medium px-4 py-1 rounded-full transition border-2 cursor-pointer text-xs">
                View All
                <GoArrowUpRight className="md:text-2xl text-xl text-white rounded-full p-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-7xl mx-auto mt-6 p-4 pb-10 mb-20 overflow-hidden">
        {/* Wrapper for smooth sliding */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${slideIndex * (100 / visibleCards)}%)`,
          }}
        >
          {RoomsList.map((room) => (
            <div
              key={room.id}
              className="relative rounded-xl overflow-hidden flex-shrink-0 
w-full sm:w-1/2 lg:w-1/4 px-2"
            >
              {/* Image */}
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-72 object-cover rounded-xl"
              />

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(room.id)}
                className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
              >
                <FaHeart
                  className={`text-lg ${
                    favorites.includes(room.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
              </button>

              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-gray-100 text-black px-2 py-1 border-2 rounded-full text-xs font-semibold shadow">
                {room.price}
              </div>

              {/* Bottom Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-[2px] text-black p-3 w-11/12 mx-auto mb-4 rounded-2xl">
                <p className="text-xs border rounded-2xl w-fit px-2 text-center mb-2">
                  Hotel in {room.location}
                </p>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{room.title}</h3>
                  <Link
                    to={room.hotelUrl}
                    className="bg-black text-white p-2 rounded-full text-xs font-medium hover:bg-gray-200 hover:text-black transition"
                  >
                    <GoArrowUpRight className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="block md:flex gap-4 p-4 items-center">
          <button
            onClick={prevSlide}
            className="bg-white border rounded-full p-3 shadow hover:bg-gray-100 cursor-pointer mr-2 md:mr-0"
          >
            <FaArrowLeftLong className="text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-black border rounded-full p-3 shadow hover:bg-gray-800 cursor-pointer"
          >
            <FaArrowRightLong className="text-white" />
          </button>
          <p className="md:absolute right-8 text-center text-xs md:text-right mt-5 md:mt-0">Book your stay personalized experiences,<br /> Luxurious amenities, or a relaxing getaway, and<br /> take step towards unforgettable memories. </p>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
