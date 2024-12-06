import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AssignedTask = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const categorizedTasks = {
    dueIn30Days: [
      { id: 1, car: "Toyota Corolla", serviceType: "Oil Change", priority: "High" },
      { id: 2, car: "Honda Civic", serviceType: "Brake Inspection", priority: "Medium" },
    ],
    dueToday: [
      { id: 3, car: "Ford Focus", serviceType: "Tire Rotation", priority: "Low" },
    ],
    pastDue: [
      { id: 4, car: "Chevrolet Malibu", serviceType: "Transmission Service", priority: "High" },
      { id: 5, car: "Nissan Altima", serviceType: "Engine Check", priority: "Medium" },
    ],
  };

  const renderStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-yellow-500",
      "In Progress": "bg-blue-500",
      Completed: "bg-green-500",
    };
    return (
      <motion.span
        className={`px-3 py-1 text-sm rounded-full text-white ${statusColors[status]} shadow-md`}
        whileHover={{ scale: 1.1 }}
      >
        {status}
      </motion.span>
    );
  };

  const handleBack = () => {
    navigate("/mechanics-dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          Assigned Tasks
        </h1>
        <motion.button
          onClick={handleBack}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-md font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Back to Dashboard
        </motion.button>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <label htmlFor="filter" className="block text-lg font-semibold mb-3">
          Filter by Status
        </label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full p-4 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {[
          { title: "Due in 30 Days", count: categorizedTasks.dueIn30Days.length, color: "from-blue-600 to-blue-400" },
          { title: "Due Today", count: categorizedTasks.dueToday.length, color: "from-yellow-500 to-yellow-400" },
          { title: "Past Due", count: categorizedTasks.pastDue.length, color: "from-red-500 to-red-400" },
        ].map((summary, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-lg shadow-lg bg-gradient-to-r ${summary.color} text-center`}
          >
            <h3 className="text-xl font-semibold text-gray-100">{summary.title}</h3>
            <p className="text-5xl font-extrabold text-gray-50">{summary.count}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Task Lists */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        {Object.entries(categorizedTasks).map(([category, tasks], idx) => (
          <motion.div key={idx} className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 capitalize">{category.replace(/([A-Z])/g, " $1")}</h2>
            {tasks.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-4 text-gray-400">Car</th>
                    <th className="p-4 text-gray-400">Service Type</th>
                    <th className="p-4 text-gray-400">Priority</th>
                    <th className="p-4 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-t border-gray-700 hover:bg-gray-700 transition-all duration-200"
                    >
                      <td className="p-4">{task.car}</td>
                      <td className="p-4">{task.serviceType}</td>
                      <td className="p-4">{task.priority}</td>
                      <td className="p-4">{renderStatusBadge("Pending")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-400">No tasks in this category.</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AssignedTask;