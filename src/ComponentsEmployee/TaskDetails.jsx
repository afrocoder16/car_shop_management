import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TaskDetails = () => {
  const { taskId } = useParams(); // Get the taskId from the URL parameter
  const navigate = useNavigate(); // For navigation
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example tasks
  const exampleTasks = [
    {
      id: 1,
      car: "Toyota Corolla",
      serviceType: "Oil Change",
      mechanicName: "John Doe",
      priority: "Medium",
      status: "Pending",
      deadline: "2024-12-15T10:00:00",
      notes: "Full synthetic oil requested.",
    },
    {
      id: 2,
      car: "Honda Civic",
      serviceType: "Tire Rotation",
      mechanicName: "Jane Smith",
      priority: "High",
      status: "In Progress",
      deadline: "2024-12-16T14:00:00",
      notes: "Rotating all four tires.",
    },
    {
      id: 3,
      car: "Ford Focus",
      serviceType: "Brake Inspection",
      mechanicName: "John Doe",
      priority: "Low",
      status: "Completed",
      deadline: "2024-12-12T09:00:00",
      notes: "Brakes are in good condition.",
    },
  ];

  // Simulate fetching the task details
  useEffect(() => {
    const foundTask = exampleTasks.find((task) => task.id === parseInt(taskId));
    setTask(foundTask || exampleTasks[0]); // Fallback to the first task if taskId is invalid
    setLoading(false);
  }, [taskId]);

  // Format the date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  // Simulate updating task status
  const updateTaskStatus = (status) => {
    setTask((prevTask) => ({ ...prevTask, status }));
    alert(`Task status updated to: ${status}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-xl text-blue-400 animate-pulse"
        >
          Loading task details...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Task Details</h2>

        <div className="space-y-4">
          <div className="text-lg">
            <strong>Car:</strong> <span className="text-gray-300">{task.car}</span>
          </div>
          <div className="text-lg">
            <strong>Service Type:</strong> <span className="text-gray-300">{task.serviceType}</span>
          </div>
          <div className="text-lg">
            <strong>Mechanic:</strong> <span className="text-gray-300">{task.mechanicName}</span>
          </div>
          <div className="text-lg">
            <strong>Priority:</strong>{" "}
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 rounded ${
                task.priority === "High"
                  ? "bg-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-green-500"
              }`}
            >
              {task.priority}
            </motion.span>
          </div>
          <div className="text-lg">
            <strong>Status:</strong>{" "}
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 rounded ${
                task.status === "Pending"
                  ? "bg-yellow-500 text-gray-900"
                  : task.status === "In Progress"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            >
              {task.status}
            </motion.span>
          </div>
          <div className="text-lg">
            <strong>Deadline:</strong>{" "}
            <span className="text-gray-300">{formatDate(task.deadline)}</span>
          </div>
          <div className="text-lg">
            <strong>Notes:</strong>{" "}
            <span className="text-gray-300">{task.notes || "No notes provided."}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          {task.status === "Pending" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => updateTaskStatus("In Progress")}
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Start Task
            </motion.button>
          )}
          {task.status === "In Progress" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => updateTaskStatus("Completed")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Complete Task
            </motion.button>
          )}
        </div>

        {/* Back Buttons */}
        <div className="mt-8 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/mechanics-dashboard")}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Back to Mechanic Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/assigned-tasks")}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Back to Task List
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskDetails;