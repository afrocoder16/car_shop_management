import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Example tasks (for testing purposes)
  const exampleTasks = [
    {
      id: 1,
      car: "Toyota Corolla",
      serviceType: "Oil Change",
      mechanicName: "John Doe",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 2,
      car: "Honda Civic",
      serviceType: "Tire Rotation",
      mechanicName: "Jane Smith",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 3,
      car: "Ford Focus",
      serviceType: "Brake Inspection",
      mechanicName: "John Doe",
      priority: "Low",
      status: "Completed",
    },
  ];

  // Simulate fetching tasks from the server (replace with actual fetch if needed)
  useEffect(() => {
    setTasks(exampleTasks); // Set example tasks to state
  }, []); // Empty dependency array ensures this only runs on mount

  // Update task status
  const updateTaskStatus = async (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
    alert("Task status updated successfully!");
  };

  // Delete a task
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Task deleted successfully!");
    }
  };

  // Filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.mechanicName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/owner-dashboard")}
        className="mb-6 text-blue-400 hover:text-blue-600 font-semibold text-lg"
      >
        &larr; Back to Owner Dashboard
      </button>

      <h2 className="text-4xl font-bold mb-6 text-center">Task List</h2>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by car or mechanic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800 p-4">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3">Car</th>
              <th className="p-3">Service Type</th>
              <th className="p-3">Mechanic</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-700 hover:bg-gray-700 transition duration-300"
              >
                <td className="p-3">{task.car}</td>
                <td className="p-3">{task.serviceType}</td>
                <td className="p-3">{task.mechanicName}</td>
                <td className="p-3">{task.priority}</td>
                <td className="p-3">
                  <span
                    className={`px-4 py-1 rounded-full text-white ${
                      task.status === "Pending"
                        ? "bg-yellow-500"
                        : task.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        task.status === "Pending" ? "In Progress" : "Completed"
                      )
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {task.status === "Pending" ? "Start" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;