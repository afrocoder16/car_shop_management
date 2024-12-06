import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WorkHistory = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch work history when the component loads
  useEffect(() => {
    fetchWorkHistory();
  }, []);

  const fetchWorkHistory = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/employee/work-history");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching work history:", error);
    }
  };

  // Filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Navigate back to Mechanics Dashboard
  const handleBackToDashboard = () => {
    navigate("/mechanics-dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 text-gradient bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text"
        >
          Work History
        </motion.h1>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-between mb-6"
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by car or service type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </motion.div>

        {/* Task History Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto"
        >
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-4">Car</th>
                <th className="p-4">Service Type</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Completion Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <motion.tr
                  key={task.id}
                  whileHover={{ scale: 1.02 }}
                  className="border-t border-gray-700 hover:bg-gray-600 transition duration-200"
                >
                  <td className="p-4">{task.car}</td>
                  <td className="p-4">{task.serviceType}</td>
                  <td className="p-4">{task.priority}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        task.status === "Completed"
                          ? "bg-green-500"
                          : task.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {task.status === "Completed"
                      ? new Date(task.completionDate).toLocaleString()
                      : "N/A"}
                  </td>
                </motion.tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-400">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Back to Dashboard Button */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleBackToDashboard}
            className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold shadow-lg transition"
          >
            Back to Mechanics Dashboard
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WorkHistory;