import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import angel from '../assets/angeleses.png';

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={angel} 
          alt="Nature" 
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 dark:from-orange-900/40 dark:to-amber-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="mb-6 text-5xl md:text-7xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400">
              Welcome to the
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">
              Home Page
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default Home;