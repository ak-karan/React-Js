import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiCalendar, FiMapPin } from "react-icons/fi";

function User() {
  const { userid } = useParams();

  // Mock user data - in real app, fetch from API
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    location: "New York, USA",
    bio: "Software developer passionate about creating amazing web experiences."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative -mt-16 mb-6"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-1">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <FiUser className="w-16 h-16 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </motion.div>

            {/* User ID Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold">
                User ID: {userid}
              </span>
            </motion.div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {userData.name}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300">
                {userData.bio}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiMail className="text-cyan-500" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiMapPin className="text-cyan-500" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiCalendar className="text-cyan-500" />
                  <span>Joined {userData.joinDate}</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mt-8"
            >
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Follow
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300">
                Message
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default User;