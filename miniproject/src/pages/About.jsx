import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiHeart } from 'react-icons/fi';

function About() {
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Our Team',
      description: 'Dedicated professionals working together to bring you the best experience.'
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: 'Our Mission',
      description: 'To create innovative solutions that make a difference in people\'s lives.'
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Our Values',
      description: 'Integrity, innovation, and customer satisfaction are at the core of everything we do.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            About Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We are a passionate team dedicated to creating amazing web experiences. 
            Our journey began with a simple idea and has grown into something 
            extraordinary. We believe in the power of technology to transform 
            businesses and improve lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-500 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;