import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MechanicProgress = () => {
  const navigate = useNavigate(); // Navigation hook

  // Example data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      vehicle: "Toyota Corolla (ABC123)",
      service: "Oil Change",
      status: "In Progress",
      progress: 50, // Percentage
      deadline: "Dec 5, 2024",
      notes: "Oil filter needs to be replaced.",
    },
    {
      id: 2,
      vehicle: "Honda Civic (XYZ789)",
      service: "Brake Inspection",
      status: "Pending",
      progress: 0, // Percentage
      deadline: "Dec 6, 2024",
      notes: "",
    },
    {
      id: 3,
      vehicle: "Ford Focus (LMN456)",
      service: "Wheel Alignment",
      status: "Completed",
      progress: 100, // Percentage
      deadline: "Dec 3, 2024",
      notes: "Completed without issues.",
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);

  // Handle editing a task
  const handleEdit = (taskId) => {
    setEditingTask(taskId);
  };

  // Handle saving the edited task
  const handleSave = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: task.status, progress: task.progress, notes: task.notes }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null); // Stop editing
  };

  // Handle field change for progress, status, or notes
  const handleFieldChange = (taskId, field, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  // Navigate back to the mechanic dashboard
  const handleBack = () => {
    navigate("/mechanics-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Mechanic Progress</h1>

        {/* Assigned Tasks */}
        <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
        <div className="space-y-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 p-6 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p><strong>Vehicle:</strong> {task.vehicle}</p>
                <p><strong>Service:</strong> {task.service}</p>
                <p>
                  <strong>Status:</strong>
                  <span className={`ml-2 ${task.status === "Completed" ? "text-green-400" : task.status === "In Progress" ? "text-yellow-400" : "text-red-400"}`}>
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
                      task.status
                    )}
                  </span>
                </p>
                <p><strong>Deadline:</strong> {task.deadline}</p>
                {editingTask === task.id && (
                  <div>
                    <label className="block mt-4 font-semibold">Notes</label>
                    <textarea
                      value={task.notes}
                      onChange={(e) => handleFieldChange(task.id, "notes", e.target.value)}
                      className="w-full bg-gray-600 text-white p-2 rounded mt-2"
                      placeholder="Add notes about the task"
                    />
                  </div>
                )}
              </div>

              <div className="w-1/3">
                <p className="text-sm mb-2">
                  Progress: 
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
                  <div
                    className={`h-4 rounded-full ${
                      task.progress === 100
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>

                {/* Edit/Save Button */}
                {editingTask === task.id ? (
                  <button
                    onClick={() => handleSave(task.id)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Work Summary */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Work Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-md shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Total Tasks</h3>
              <p className="text-2xl font-semibold">{tasks.length}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-md shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">In Progress</h3>
              <p className="text-2xl font-semibold text-yellow-400">
                {tasks.filter((task) => task.status === "In Progress").length}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-md shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Completed</h3>
              <p className="text-2xl font-semibold text-green-400">
                {tasks.filter((task) => task.status === "Completed").length}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold"
          >
            Back to Mechanics Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default MechanicProgress;