import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MechanicsDashboard = () => {
  const navigate = useNavigate();

  // Example data
  const [tasks] = useState([
    { id: 1, car: "Toyota Corolla", service: "Oil Change", status: "In Progress" },
    { id: 2, car: "Honda Civic", service: "Brake Check", status: "Pending" },
    { id: 3, car: "Ford Explorer", service: "Tire Rotation", status: "Completed" },
  ]);

  const [notifications] = useState([
    { id: 1, message: "New task assigned: Tire Alignment for Mazda 3", time: "10 minutes ago" },
    { id: 2, message: "Brake parts are ready for installation", time: "1 hour ago" },
    { id: 3, message: "Transmission service completed for Hyundai Sonata", time: "Yesterday" },
  ]);

  const [workHistory] = useState([
    { id: 1, car: "Chevrolet Malibu", service: "Oil Change", date: "Nov 25, 2024" },
    { id: 2, car: "Mazda 3", service: "Brake Inspection", date: "Nov 20, 2024" },
    { id: 3, car: "Nissan Altima", service: "Tire Rotation", date: "Nov 15, 2024" },
  ]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 w-1/4 p-6 shadow-lg"
      >
        <h2 className="text-3xl font-extrabold text-blue-400 mb-6">Mechanic Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/mechanics-dashboard")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/assigned-tasks")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Assigned Tasks
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/mechanic-progress")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Mechanic Progress
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/mechanic-notifications")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Notifications
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/work-history")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Work History
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/task-details")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Task Details
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/mechanic-tools")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Mechanic Tools
            </button>
          </li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
          Mechanics Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assigned Tasks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
            <button
              onClick={() => navigate("/assigned-tasks")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md mb-4 transition-transform transform hover:scale-105"
            >
              View All Assigned Tasks
            </button>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <motion.li
                  whileHover={{ scale: 1.03 }}
                  key={task.id}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-md shadow-md hover:bg-gray-600 transition"
                >
                  <div>
                    <p className="font-bold">{task.car}</p>
                    <p className="text-sm text-gray-400">{task.service}</p>
                  </div>
                  <span
                    className={`py-1 px-3 rounded ${
                      task.status === "Completed"
                        ? "bg-green-600"
                        : task.status === "Pending"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-blue-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <motion.li
                  whileHover={{ scale: 1.03 }}
                  key={notification.id}
                  className="bg-gray-700 p-4 rounded-md shadow-md hover:bg-gray-600 transition"
                >
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-400">{notification.time}</p>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/mechanic-notifications")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md mt-4 transition-transform transform hover:scale-105"
            >
              View Notifications
            </button>
          </motion.div>
        </div>

        {/* Mechanic Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Mechanic Progress</h2>
          <button
            onClick={() => navigate("/mechanic-progress")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md mb-4 transition-transform transform hover:scale-105"
          >
            View Progress
          </button>
        </motion.div>

        {/* Work History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Work History</h2>
          <button
            onClick={() => navigate("/work-history")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md mb-4 transition-transform transform hover:scale-105"
          >
            View Work History
          </button>
          <ul className="mt-4 space-y-4">
            {workHistory.map((entry) => (
              <motion.li
                whileHover={{ scale: 1.03 }}
                key={entry.id}
                className="bg-gray-700 p-4 rounded-md shadow-md hover:bg-gray-600 transition"
              >
                <p className="font-bold">{entry.car}</p>
                <p className="text-sm text-gray-400">{entry.service}</p>
                <p className="text-sm">{entry.date}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MechanicsDashboard;