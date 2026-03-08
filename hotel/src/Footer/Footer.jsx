import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// Data arrays
const Information = [
  { id: 1, title: "Privacy", link: "/" },
  { id: 2, title: "FAQ", link: "/" },
  { id: 3, title: "Shipping & Payment", link: "/" },
  { id: 4, title: "Partners", link: "/" },
  { id: 5, title: "Blog", link: "/" },
  { id: 6, title: "Contacts", link: "/" },
];

const FooterMenu = [
  { id: 1, title: "For a Couple", link: "/" },
  { id: 2, title: "For Him", link: "/" },
  { id: 3, title: "For Her", link: "/" },
];

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 - Logo */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-4">YourLogo</h2>
          <p className="text-sm leading-relaxed">
            Luxury hotels and resorts providing world-class hospitality and
            premium services.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div className="grid grid-cols-2 gap-8">
          {/* Information */}
          <div>
            <h3 className="text-black font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              {Information.map((item) => (
                <li key={item.id}>
                  <a href={item.link} className="hover:text-black transition">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-black font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm">
              {FooterMenu.map((item) => (
                <li key={item.id}>
                  <a href={item.link} className="hover:text-black transition">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3 - Contact & Button */}
        <div className="md:text-right">
          <button className="bg-black text-white font-semibold px-6 py-2 rounded-2xl hover:bg-gray-800 transition">
            Request a Call
          </button>
          <div className="mt-6 space-y-2 text-sm">
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@yourhotel.com</p>
            <p>🕒 Mon - Sat: 9am - 6pm</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Icons */}
          <div className="flex space-x-4 text-gray-600">
            <a href="/" className="hover:text-black"><FaFacebookF /></a>
            <a href="/" className="hover:text-black"><FaInstagram /></a>
            <a href="/" className="hover:text-black"><FaTwitter /></a>
            <a href="/" className="hover:text-black"><FaYoutube /></a>
          </div>

          {/* Address */}
          <div className="text-sm text-gray-500 text-center md:text-right">
            © 2025 YourHotel. All rights reserved. | 123, Main Street, New Delhi
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
