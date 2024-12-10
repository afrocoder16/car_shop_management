import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MechanicProgress = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      vehicle: "Toyota Corolla (ABC123)",
      service: "Oil Change",
      status: "In Progress",
      progress: 50,
      deadline: "Dec 5, 2024",
      notes: "Oil filter needs to be replaced.",
    },
    {
      id: 2,
      vehicle: "Honda Civic (XYZ789)",
      service: "Brake Inspection",
      status: "Pending",
      progress: 0,
      deadline: "Dec 6, 2024",
      notes: "",
    },
    {
      id: 3,
      vehicle: "Ford Focus (LMN456)",
      service: "Wheel Alignment",
      status: "Completed",
      progress: 100,
      deadline: "Dec 3, 2024",
      notes: "Completed without issues.",
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (taskId) => {
    setEditingTask(taskId);
  };

  const handleSave = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status, progress: task.progress, notes: task.notes }
          : task
      )
    );
    setEditingTask(null);
  };

  const handleFieldChange = (taskId, field, value) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
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
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-gray-700 p-10 rounded-lg shadow-xl"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold mb-6 text-center text-gradient bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text"
        >
          Mechanic Progress
        </motion.h1>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-6 rounded-md shadow-lg flex justify-between items-start"
            >
              {/* Task Details */}
              <div>
                <p>
                  <strong>Vehicle:</strong> {task.vehicle}
                </p>
                <p>
                  <strong>Service:</strong> {task.service}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {editingTask === task.id ? (
                    <select
                      value={task.status}
                      onChange={(e) => handleFieldChange(task.id, "status", e.target.value)}
                      className="bg-gray-600 text-white p-2 rounded"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`${
                        task.status === "Completed"
                          ? "text-green-400"
                          : task.status === "In Progress"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {task.status}
                    </span>
                  )}
                </p>
                <p>
                  <strong>Deadline:</strong> {task.deadline}
                </p>
                {editingTask === task.id && (
                  <div className="mt-4">
                    <label className="block font-semibold">Notes</label>
                    <textarea
                      value={task.notes}
                      onChange={(e) => handleFieldChange(task.id, "notes", e.target.value)}
                      className="w-full bg-gray-600 text-white p-2 rounded mt-2"
                      placeholder="Add notes about the task"
                    />
                  </div>
                )}
              </div>

              {/* Progress & Edit Controls */}
              <div className="w-1/3">
                <p className="text-sm mb-2">
                  Progress:{" "}
                  {editingTask === task.id ? (
                    <input
                      type="number"
                      value={task.progress}
                      onChange={(e) => handleFieldChange(task.id, "progress", e.target.value)}
                      className="w-full bg-gray-600 text-white p-2 rounded mt-2"
                      min="0"
                      max="100"
                    />
                  ) : (
                    `${task.progress}%`
                  )}
                </p>
                <div className="w-full bg-gray-600 rounded-full h-4">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${task.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-4 rounded-full ${
                      task.progress === 100
                        ? "bg-green-500"
                        : task.progress > 0
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  ></motion.div>
                </div>
                {editingTask === task.id ? (
                  <button
                    onClick={() => handleSave(task.id)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4 transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Work Summary */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Work Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-6 rounded-md shadow-md text-center"
            >
              <h3 className="text-xl font-bold mb-2">Total Tasks</h3>
              <p className="text-2xl font-extrabold">{tasks.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-6 rounded-md shadow-md text-center"
            >
              <h3 className="text-xl font-bold mb-2">In Progress</h3>
              <p className="text-2xl font-extrabold text-yellow-400">
                {tasks.filter((task) => task.status === "In Progress").length}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-6 rounded-md shadow-md text-center"
            >
              <h3 className="text-xl font-bold mb-2">Completed</h3>
              <p className="text-2xl font-extrabold text-green-400">
                {tasks.filter((task) => task.status === "Completed").length}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.1 }}
            className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold shadow-lg"
          >
            Back to Mechanics Dashboard
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MechanicProgress;