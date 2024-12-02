import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MechanicsDashboard = () => {
  const navigate = useNavigate(); // Navigation hook

  // Example data for Assigned Tasks, Work History, and Notifications
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

  // Example data for Work History
  const [workHistory] = useState([
    { id: 1, car: "Chevrolet Malibu", service: "Oil Change", date: "Nov 25, 2024" },
    { id: 2, car: "Mazda 3", service: "Brake Inspection", date: "Nov 20, 2024" },
    { id: 3, car: "Nissan Altima", service: "Tire Rotation", date: "Nov 15, 2024" },
  ]);

  // Navigate to Task Details page with task ID
  const handleTaskClick = (task) => {
    navigate(`/task-details/${task.id}`); // Navigate to Task Details page using the task ID
  };

  const handleNotificationClick = (notification) => {
    alert(`Notification: ${notification.message}`);
  };

  const handleGoToAssignedTasks = () => {
    navigate("/assigned-tasks");
  };

  const handleGoToMechanicProgress = () => {
    navigate("/mechanic-progress");
  };

  const handleGoToNotifications = () => {
    navigate("/mechanic-notifications");
  };

  const handleGoToWorkHistory = () => {
    navigate("/work-history");
  };

  // This is the correct method to keep the "Task Details" button working properly
  const handleGoToTasksDetails = () => {
    navigate("/task-details"); // Keeping this to allow manual navigation to the Task Details page
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 w-1/4 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Mechanic Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/mechanics-dashboard")}
              className="text-blue-400 hover:text-white"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={handleGoToAssignedTasks}
              className="text-blue-400 hover:text-white"
            >
              Assigned Tasks
            </button>
          </li>
          <li>
            <button
              onClick={handleGoToMechanicProgress}
              className="text-blue-400 hover:text-white"
            >
              Mechanic Progress
            </button>
          </li>
          <li>
            <button
              onClick={handleGoToNotifications}
              className="text-blue-400 hover:text-white"
            >
              Notifications
            </button>
          </li>
          <li>
            <button
              onClick={handleGoToWorkHistory}
              className="text-blue-400 hover:text-white"
            >
              Work History
            </button>
          </li>
          {/* This button is for navigating to Task Details manually */}
          <li>
            <button
              onClick={handleGoToTasksDetails}
              className="text-blue-400 hover:text-white"
            >
              Task Details
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Mechanics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assigned Tasks Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
            <button
              onClick={handleGoToAssignedTasks}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md mb-4"
            >
              View All Assigned Tasks
            </button>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-600 transition duration-200"
                  onClick={() => handleTaskClick(task)} // Task navigation to Task Details page using the `task.id`
                >
                  <div>
                    <p className="font-bold">{task.car}</p>
                    <p className="text-sm text-gray-400">{task.service}</p>
                  </div>
                  <p
                    className={`font-semibold ${
                      task.status === "Completed"
                        ? "text-green-400"
                        : task.status === "Pending"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {task.status}
                  </p>
                </li>
              ))}
            </ul>
            {tasks.length === 0 && (
              <p className="text-center text-gray-400 mt-4">No tasks assigned yet.</p>
            )}
          </div>

          {/* Notifications Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-600 transition duration-200"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-400">{notification.time}</p>
                </li>
              ))}
            </ul>
            {notifications.length === 0 && (
              <p className="text-center text-gray-400 mt-4">No notifications available.</p>
            )}
          </div>
        </div>

        {/* Mechanic Progress Section */}
        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Mechanic Progress</h2>
          <button
            onClick={handleGoToMechanicProgress}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md mb-4"
          >
            View Progress
          </button>
          <p className="text-gray-400">You can view and update your progress for assigned tasks here.</p>
        </div>

        {/* Work History Section */}
        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Work History</h2>
          <button
            onClick={handleGoToWorkHistory}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md mb-4"
          >
            View Work History
          </button>
          <p className="text-gray-400">View all your completed tasks and service records here.</p>
          {/* Display work history examples */}
          <ul className="mt-4 space-y-4">
            {workHistory.map((entry) => (
              <li key={entry.id} className="bg-gray-700 p-4 rounded-md shadow-md">
                <p className="font-bold">{entry.car}</p>
                <p className="text-sm text-gray-400">{entry.service}</p>
                <p className="text-sm">{entry.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MechanicsDashboard;