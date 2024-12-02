import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssignedTask = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  // Mock data for tasks (for demo purposes)
  const categorizedTasks = {
    dueIn30Days: [
      { id: 1, car: "Toyota Corolla", serviceType: "Oil Change", dueInDays: 15, priority: "High" },
      { id: 2, car: "Honda Civic", serviceType: "Brake Inspection", dueInDays: 25, priority: "Medium" }
    ],
    dueToday: [
      { id: 3, car: "Ford Focus", serviceType: "Tire Rotation", dueInDays: 0, priority: "Low" }
    ],
    pastDue: [
      { id: 4, car: "Chevrolet Malibu", serviceType: "Transmission Service", dueInDays: -5, priority: "High" },
      { id: 5, car: "Nissan Altima", serviceType: "Engine Check", dueInDays: -10, priority: "Medium" }
    ],
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-yellow-500",
      "In Progress": "bg-blue-500",
      Completed: "bg-green-500",
    };
    return (
      <span className={`px-2 py-1 rounded text-white ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  // Navigate back to the mechanics dashboard
  const handleBack = () => {
    navigate("/mechanics-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Assigned Tasks</h2>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <label htmlFor="filter" className="block text-lg font-semibold mb-2">
          Filter by Status
        </label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div>
        {/* Due Summary */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-600 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Due in 30 Days</h3>
            <p className="text-4xl font-bold">{categorizedTasks.dueIn30Days.length}</p>
          </div>
          <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Due Today</h3>
            <p className="text-4xl font-bold">{categorizedTasks.dueToday.length}</p>
          </div>
          <div className="bg-red-500 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Past Due</h3>
            <p className="text-4xl font-bold">{categorizedTasks.pastDue.length}</p>
          </div>
        </div>

        {/* Task Lists for each category */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Tasks Due Today */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Due Today</h3>
            {categorizedTasks.dueToday.length > 0 ? (
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    <th className="p-4 text-gray-300">Car</th>
                    <th className="p-4 text-gray-300">Service Type</th>
                    <th className="p-4 text-gray-300">Priority</th>
                    <th className="p-4 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {categorizedTasks.dueToday.map((task) => (
                    <tr key={task.id} className="border-t border-gray-700">
                      <td className="p-4">{task.car}</td>
                      <td className="p-4">{task.serviceType}</td>
                      <td className="p-4">{task.priority}</td>
                      <td className="p-4">{renderStatusBadge("Pending")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-400">No tasks due today.</p>
            )}
          </div>

          {/* Tasks Due in 30 Days */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Due in 30 Days</h3>
            {categorizedTasks.dueIn30Days.length > 0 ? (
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    <th className="p-4 text-gray-300">Car</th>
                    <th className="p-4 text-gray-300">Service Type</th>
                    <th className="p-4 text-gray-300">Priority</th>
                    <th className="p-4 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {categorizedTasks.dueIn30Days.map((task) => (
                    <tr key={task.id} className="border-t border-gray-700">
                      <td className="p-4">{task.car}</td>
                      <td className="p-4">{task.serviceType}</td>
                      <td className="p-4">{task.priority}</td>
                      <td className="p-4">{renderStatusBadge("In Progress")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-400">No tasks due in the next 30 days.</p>
            )}
          </div>

          {/* Past Due Tasks */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Past Due</h3>
            {categorizedTasks.pastDue.length > 0 ? (
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    <th className="p-4 text-gray-300">Car</th>
                    <th className="p-4 text-gray-300">Service Type</th>
                    <th className="p-4 text-gray-300">Priority</th>
                    <th className="p-4 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {categorizedTasks.pastDue.map((task) => (
                    <tr key={task.id} className="border-t border-gray-700">
                      <td className="p-4">{task.car}</td>
                      <td className="p-4">{task.serviceType}</td>
                      <td className="p-4">{task.priority}</td>
                      <td className="p-4">{renderStatusBadge("Completed")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-400">No past due tasks.</p>
            )}
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

export default AssignedTask;