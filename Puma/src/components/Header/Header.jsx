import { Link, NavLink } from "react-router-dom";

export default function Header(){
    return(
        <>
            <header className="shadow sticky z-50 top-0">
                <nav className="bg-black text-white border-gray-300 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex items-center">
                            <img src="./public\images\puma-logo.png" className="mr-3 h-10 ml-4" alt="PUMA LOGO" />
                        </Link>
                        <div className="flex items-center lg:order-2">
                        <Link
                            to="#"
                            className="text-white hover:bg-gray-50 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-8 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/man"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-amber-50"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Man
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/woman"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-amber-50"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Woman
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/sport"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-amber-50"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Sport
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/motorsport"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-amber-50"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Motorsport
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/lifestyle"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-amber-50"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Lifestyle
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/kids"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "underline underline-offset-8" : "text-amber-50"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:underline hover:underline-offset-8 lg:p-0`
                                    }
                                >
                                    Kids
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
