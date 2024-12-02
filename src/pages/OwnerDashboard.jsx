import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskAssignmentForm from "../ComponentsOwner/TaskAssignmentForm";
import CarProgressTable from "../ComponentsOwner/CarProgressTable";
import Notifications from "../ComponentsOwner/Notifications";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [mechanics] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
  const [notifications, setNotifications] = useState([]);

  // Function to handle new task submission
  const handleTaskSubmit = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      status: "Pending",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Create a notification for the new task assignment
    addNotification(`New task assigned for ${task.car}: ${task.serviceType}`);
  };

  // Function to handle task status updates
  const updateTaskStatus = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    addNotification(`Task for ${task?.car} marked as ${status}`);
  };

  // Function to handle task deletion
  const handleTaskDelete = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    addNotification(`Task for ${taskToDelete?.car} deleted.`);
  };

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
    <div className="flex min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Sidebar for Navigation */}
      <div className="bg-gray-800 w-1/5 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-white mb-6">Owner Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/owner-dashboard")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/manage-cars-owner")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Manage Cars
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/statistics-cards")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Statistics Cards
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/task-assignment")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Task Assignment
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/task-list")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Task List
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/car-progress-table")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Car Progress
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/mechanic-management")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Mechanic Management
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/owner-notifications")}
              className="text-blue-400 hover:text-white transition duration-300"
            >
              Notifications
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-8 text-center text-white">
            Owner Dashboard
          </h1>

          {/* Dashboard Widgets */}
          <div className="flex justify-between gap-6 mb-8">
            {/* Task Assignment */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-1/2">
              <h2 className="text-xl font-semibold text-white mb-4">Assign Tasks</h2>
              <button
                onClick={() => navigate("/task-assignment")}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Go to Task Assignment
              </button>
            </div>

            {/* Car Progress */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-1/2">
              <h2 className="text-xl font-semibold text-white mb-4">Car Progress</h2>
              <button
                onClick={() => navigate("/car-progress-table")}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                View Car Progress
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
            <button
              onClick={() => navigate("/owner-notifications")}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              View Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;