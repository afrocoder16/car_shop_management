import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Function to add a notification
  const addNotification = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        id: prevNotifications.length + 1,
        message,
        date: new Date().toLocaleString(),
      },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 w-1/5 p-6 shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Owner Panel
        </h2>
        <ul className="space-y-6">
          {[
            { name: "Dashboard", path: "/owner-dashboard" },
            { name: "Manage Cars", path: "/manage-cars-owner" },
            { name: "Statistics", path: "/statistics-cards" },
            { name: "Task Assignment", path: "/task-assignment" },
            { name: "Task List", path: "/task-list" },
            { name: "Car Progress", path: "/car-progress-table" },
            { name: "Mechanic Management", path: "/mechanic-management" },
            { name: "Notifications", path: "/owner-notifications" },
          ].map((item, index) => (
            <motion.li
              whileHover={{ scale: 1.05 }}
              key={index}
              className="text-lg font-semibold text-gray-300 hover:text-white cursor-pointer transition duration-300"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <h1 className="text-5xl font-bold mb-8 text-center text-gray-100">
            Owner Dashboard
          </h1>

          {/* Widgets Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Task Assignment */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-200">
                Assign Tasks
              </h2>
              <button
                onClick={() => navigate("/task-assignment")}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 font-bold"
              >
                Go to Task Assignment
              </button>
            </motion.div>

            {/* Car Progress */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-200">
                Car Progress
              </h2>
              <button
                onClick={() => navigate("/car-progress-table")}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 font-bold"
              >
                View Car Progress
              </button>
            </motion.div>
          </div>

          {/* Notifications Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700 p-6 rounded-lg shadow-md mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-200">
              Notifications
            </h2>
            <button
              onClick={() => navigate("/owner-notifications")}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 font-bold"
            >
              View Notifications
            </button>
          </motion.div>

          {/* Recent Notifications */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-200">
              Recent Activity
            </h2>
            {notifications.length > 0 ? (
              <ul className="space-y-4 max-h-48 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    key={notification.id}
                    className="bg-gray-800 p-4 rounded-md shadow-sm border border-gray-600"
                  >
                    <p className="text-gray-200">{notification.message}</p>
                    <span className="text-sm text-gray-400">
                      {notification.date}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400">No notifications yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OwnerDashboard;