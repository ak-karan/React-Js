import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiPuma } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterest, FaFacebook } from "react-icons/fa6";
import { useTranslation } from "react-i18next"; // ✅ FIXED
import LanguageSelector from "../component/LanguageSelector.jsx";

function Footer() {
  const { t } = useTranslation();

  const supportLink = [
    { key: 1, title: "Contact us", linkTo: "/" },
    { key: 2, title: "FAQs", linkTo: "/" },
    { key: 3, title: "Promotions & Sale", linkTo: "/" },
    { key: 4, title: "My Account", linkTo: "/" },
    { key: 5, title: "Track Order", linkTo: "/" },
    { key: 6, title: "Exchange & Return Policy", linkTo: "/" },
    { key: 7, title: "Shoe Care", linkTo: "/" },
    { key: 8, title: "Privacy Policy", linkTo: "/" },
    { key: 9, title: "Tech Glossary", linkTo: "/" },
    { key: 10, title: "Terms & Conditions", linkTo: "/" },
    { key: 11, title: "Initiate Return / Exchange", linkTo: "/" },
    { key: 12, title: "Shoes", linkTo: "/" },
    { key: 13, title: "Sneakers", linkTo: "/" },
    { key: 14, title: "Running Shoes", linkTo: "/" },
    { key: 15, title: "Nitro ", linkTo: "/" },
    { key: 16, title: "Sitemap", linkTo: "/" },
    { key: 17, title: "Cookie Settings", linkTo: "/" },
  ];

  const fotterAboutLink = [
    { key: 1, title: "GO WILD", linkTo: "/" },
    { key: 2, title: "Company", linkTo: "/" },
    { key: 3, title: "Corporate News", linkTo: "/" },
    { key: 4, title: "Press Center", linkTo: "/" },
    { key: 5, title: "Investors", linkTo: "/" },
    { key: 6, title: "Sustainability", linkTo: "/" },
    { key: 7, title: "Careers", linkTo: "/" },
    { key: 8, title: "Store Locator", linkTo: "/" },
    { key: 9, title: "PUMA Articles", linkTo: "/" },
  ];

  const socialMediaLinks = [
    { key: 1, title: "Facebook", linkTo: "/", icon: <FaFacebook /> },
    { key: 2, title: "Twitter", linkTo: "/", icon: <BsTwitterX /> },
    { key: 3, title: "Instagram", linkTo: "/", icon: <FaInstagram /> },
    { key: 4, title: "LinkedIn", linkTo: "/", icon: <FaLinkedinIn /> },
    { key: 5, title: "Pinterest", linkTo: "/", icon: <FaPinterest /> }, // ✅ FIXED
  ];
    // This function returns JSX for a single link
    const SupportLinkItem = ({ title, linkTo }) => (
        <li className="mb-1 inline-block w-68">
            <Link to={linkTo} className="text-gray-400 hover:text-gray-200 transition-colors duration-200 text-xl capitalize m-0 p-0">
                {title}
            </Link>
        </li>
    );
    const SocialLinkItem = ({ title, linkTo, icon }) => (
        <li className="mb-1 inline-block hover:bg-slate-800 p-2 rounded-full">
            <Link
            to={linkTo}
            className="transition-colors duration-200 text-lg m-0 p-0"
            aria-label={title} // accessibility
            title={title}      // tooltip
            >
            {icon}
            </Link>
        </li>
        );
    return (
        <>
            
            <footer className="w-full bg-slate-950 py-12 px-8 md:px-15 grid grid-cols-1 md:grid-cols-4 gap-8 text-amber-50">
                <div className="space-y-3 col-span-2">
                    <h3 className="text-xl font-semibold mb-4 uppercase">Support</h3>
                    <ul className="space-y-3">
                        {supportLink.map((item) => (
                            <SupportLinkItem
                                key={item.key}
                                title={item.title}
                                linkTo={item.linkTo}
                            />
                        ))}
                    </ul>
                </div>

                <div className="space-y-5">
                    <h3 className="text-xl font-semibold mb-4 uppercase">About Us</h3>
                    <ul className="space-y-2">
                        {fotterAboutLink.map((item) => (
                            <SupportLinkItem
                                key={item.key}
                                title={item.title}
                                linkTo={item.linkTo}
                            />
                        ))}
                    </ul>
                </div>

                <div className="space-y-4 col-span-2 sm:col-span-1">
                    <h3 className="text-xl font-semibold mb-4 uppercase">Stay up to date</h3>
                    <ul className="">
                    {socialMediaLinks.map((item) => (
                        <SocialLinkItem
                        key={item.key}
                        title={item.title}
                        linkTo={item.linkTo}
                        icon={item.icon}
                        />
                    ))}
                    </ul>

                    <h3>Explore</h3>
                    <ul>
                        <li className="w-18 uppercase text-xs float-left text-center mr-2">
                            <Link to="" className="text-center">
                                <SiPuma className="text-center bg-slate-900 p-4 text-7xl border-2 border-solid border-gray-500 rounded-xl hover:border-gray-400 transition-colors" />
                                App 
                            </Link>
                        </li>
                        <li className="w-18 uppercase text-xs float-left text-center mr-2">
                            <Link to="" className="text-center">
                                <SiPuma className="text-center bg-slate-900 p-4 text-7xl border-2 border-solid border-gray-500 rounded-xl hover:border-gray-400 transition-colors" />
                                App 
                            </Link>
                        </li> 
                    </ul>
                    
                </div>
            </footer>
            <div className="border-t bg-slate-950 border-slate-700 pt-10 pb-6 text-center text-sm text-gray-400">

            <div className="p-6 text-center">
            <LanguageSelector />
            <h1 className="text-2xl font-bold mt-6">{t("welcome")}</h1>
            </div>
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </>
    );
}

export default Footer;