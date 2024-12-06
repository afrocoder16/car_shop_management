import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("Light");

  const handleSaveChanges = () => {
    console.log("Settings Updated:", {
      username,
      email,
      password,
      notifications,
      theme,
    });
    alert("Settings saved successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 flex justify-center items-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full bg-gray-700 p-10 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Settings</h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Username */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="username" className="block font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          {/* Email */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <label htmlFor="notifications" className="ml-3 font-semibold">
              Enable Notifications
            </label>
          </motion.div>

          {/* Theme */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="theme" className="block font-semibold mb-2">
              Theme
            </label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </motion.div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md"
          >
            Save Changes
          </motion.button>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/Dashboard")}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-md mt-4"
          >
            Back to Dashboard
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Settings;