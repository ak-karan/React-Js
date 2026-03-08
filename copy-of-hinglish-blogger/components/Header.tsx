import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors dark:text-gray-100 dark:hover:text-red-500">
              Hinglish Blogger
            </Link>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Home</Link>
                <Link to="/admin/dashboard" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Admin Panel</Link>
              </div>
            </nav>
            <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
