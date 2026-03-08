import { Link } from "react-router-dom";
import banner from "../assets/images/hotel-banner.jpg";
import discoverright from "../assets/images/discover-exceleance-right.jpg";
import hotelroomlist1 from "../assets/images/hotelroomlist-1.jpg";
import hotelroomlist2 from "../assets/images/hotelroomlist-2.jpg";
import hotelroomlist3 from "../assets/images/hotelroomlist-3.jpg";
import hotelroomlist4 from "../assets/images/hotelroomlist-4.jpg";
import abhotel from "../assets/images/white-pillow-bed.jpg";
import { FiMapPin } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import HotelRoomsCarousel from "../component/Carousel/HotelRoomsCarousel";
import TabsComponent from "../component/TabButtons";
import HotelList from "../component/Carousel/HotelList";
import SearchBoxMain from "./SearchBoxMain";
import Testimonials from "../component/testimonials";

const Home = () => {
  return (
    <>
      {/* Home Banner */}
      <div className="relative w-full h-[80vh]">
        {/* Banner Image */}
        <img
          className="w-full h-full object-cover"
          src={banner}
          alt="5 Star Hotel Banner"
        />

        {/* Overlay (optional dark layer for better text contrast) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-8 text-shadow-xl">
            Find your perfect Stay,
            <br /> anytime, anywhere.
          </h1>

          {/* Search Form */}
          <SearchBoxMain />
        </div>
      </div>
      {/* that is About Section */}
      <div className="my-11 mx-10">
        <div className="">
          <div className="w-30 my-5 mx-auto">
            <Link
              to="/"
              className="hover:bg-black hover:text-white transition p-0.5 flex items-center justify-center border shadow-2xl rounded-4xl text-xs capitalize gap-2"
            >
              Let's Know us
              <IoIosArrowRoundForward className="text-xl bg-white rounded-full text-black" />
            </Link>
          </div>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight drop-shadow-lg mb-20 text-shadow-xl ">
              Find Comfort Embrace Travel, Your
              <br /> Stay, Our Care
            </h2>
          </div>
          <div className="">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <div className="text-left">
                  <h3 className="py-2 px-4 text-base font-semibold w-30 rounded-4xl text-center border border-gray-300 shadow-xs mb-4">
                    About Us
                  </h3>
                  <p className="text-3xl md:text-4xl leading-[1.3] font-medium text-left mb-4">
                    Sunrise makes finding stays, simple connecting travelers
                    with trusted hotels nationwide.
                  </p>
                  <button className="flex items-center gap-2 bg-white hover:bg-black text-black font-medium px-4 py-1 rounded-full transition hover:text-white border-2 border-slate-300 cursor-pointer text-xs">
                    Learn more
                    <GoArrowUpRight className="md:text-2xl text-xl bg-white text-black rounded-full p-1" />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 bg-white">
                <div className="w-full relative">
                  {/* Image */}
                  <img
                    className="w-full rounded-3xl"
                    src={abhotel}
                    alt="About Hotel"
                  />

                  {/* Overlay Content */}
                  <div className="absolute top-44 md:top-55 right-0 z-10 p-4 max-w-[68%] md:max-w-[60%]">
                    <p className="text-base font-semibold mb-3">
                      A versatile platform offering a wide range of hotel
                      options and services.
                    </p>

                    <div className="flex items-center">
                      <Link
                        to="/"
                        className="flex items-center gap-2 bg-black hover:bg-white text-white hover:text-black font-semibold px-3 py-2 rounded-full transition border-2 text-sm"
                      >
                        <FiMapPin />
                        Majuli, Assam
                      </Link>
                      <Link to="/" className="ml-3">
                        <GoArrowUpRight className="md:text-3xl text-xl bg-gray-200 text-black rounded-full p-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 bg-white">
                <HotelRoomsCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 h-0.5 mx-15"></div>

      {/* Discover Hotel */}
      <div className="my-11 mx-4 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left Tabs Section */}
          <div className="md:col-span-7 md:p-4">
            <TabsComponent />
          </div>

          {/* Right Discover Section */}
          <div className="md:col-span-5">
            <div className="bg-white flex flex-col items-start justify-start p-6 rounded-xl h-auto shadow-md md:shadow-none">
              {/* Header */}
              <h1 className="text-xl sm:text-2xl md:text-[44px] font-extralight text-left leading-[1.3] max-w-3xl mb-6">
                Discover Excellence in <br className="hidden md:block" />
                hospitality. Trusted <br className="hidden md:block" />
                <span className="inline-flex items-left">
                  hostel you can rely on
                  <span className="p-1 w-8 h-8 md:w-8 md:h-20 rounded-full border border-black transform rotate-35 mt-12 text-left">
                    <img
                      src={discoverright}
                      alt="Icon"
                      className="w-full h-5 object-cover rounded-full"
                    />
                  </span>
                </span>
              </h1>

              {/* Image and Text Block */}
              <div className="flex flex-col md:flex-row items-start gap-6 w-full -mt-4">
                {/* Image with Plus Button */}
                <div className="relative w-full md:w-1/2">
                  <img
                    src={discoverright}
                    alt="Hostel Interior"
                    className="w-full h-60 md:h-60 rounded-2xl object-cover shadow-lg"
                  />
                  <button className="absolute top-1/2 -left-7 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 border-4 md:border-8 border-gray-100 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-lg flex items-center justify-center text-2xl md:text-4xl">
                    +
                  </button>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-2">
                    *
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Our top-tier medical facilities offer a comprehensive range
                    of services, including advanced diagnostics, specialized
                    treatment centers, and 24/7 emergency care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This is Hotel Rooms List  */}

      <div className="bg-gray-100 mx-12 rounded-3xl">
        <div className="">
          <HotelList />
        </div>
      </div>

      {/* Near by best loaction  */}

      <div className="mx-20 md:my-30 my-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 shadow-md px-3 py-1 rounded-4xl border-2 text-xs border-gray-300 mb-4"
        >
          Explore locations
          <IoIosArrowRoundForward className="text-xl" />
        </Link>
        <h6 className="text-3xl leading-10 md:text-5xl mb-5 font-semibold md:leading-14 capitalize font-stretch-semi-condensed tracking-tight">
          Nearby Best Location Here,
          <br />
          Tursted Care Mode Easy, Explore!
        </h6>
        <p className="text-xs font-semibold mb-5 mt-3 block">
          Find the best bests location around you with easy and access top-notch{" "}
          <br /> healthcare services tailored to your needs.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 shadow-md px-3 py-1 rounded-4xl border text-xs border-black border-solid mb-4"
        >
          Get Started
          <GoArrowUpRight className="text-xl" />
        </Link>
        <p className="text-xs">Pause or cancel anytime.</p>
      </div>

      {/* Images Boxes  */}

      <div className="mx-10 flex md:gap-4 gap-2 items-center justify-center">
        <img
          className="float-left md:w-55 md:h-55 md:block hidden rounded-3xl"
          src={hotelroomlist1}
          title="hello"
        />
        <img
          className="float-left md:w-30 md:h-55 w-20 h-20 mb-24 rounded-3xl"
          src={hotelroomlist2}
          title="hello"
        />
        <img
          className="float-left md:w-55 md:h-55 w-25 h-25 rounded-3xl"
          src={hotelroomlist3}
          title="hello"
        />
        <p className="float-left md:w-55 md:h-55 py-2 px-3 md:mb-24 md:px-0 md:py-0 rounded-3xl md:text-2xl text-xs text-center text-white bg-black md:leading-50">
          Join Our Now
        </p>
        <img
          className="float-left md:w-30 md:h-55 w-25 h-25 rounded-3xl"
          src={hotelroomlist4}
          title="hello"
        />
        <img
          className="float-left md:w-55 md:h-55 w-20 h-20 mb-24 rounded-3xl"
          src={hotelroomlist2}
          title="hello"
        />
      </div>

      {/* Testimonials Boxes  */}

      <div className="grid grid-cols-12 gap-4 mx-10">
        <div className="col-span-12 md:col-span-3">
          <img className="md:w-40 w-50 mx-auto md:mr-0 md:ml-auto rounded-3xl md:mt-33 mt-8" src={hotelroomlist2} title="hello" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Testimonials />
        </div>
        <div className="col-span-12 md:col-span-3">
          <img className="md:w-30 w-50 mx-auto md:mr-auto md:ml-0 rounded-3xl md:mt-41" src={hotelroomlist4} title="hello" />
        </div>
      </div>
    </>
  );
};

export default Home;
