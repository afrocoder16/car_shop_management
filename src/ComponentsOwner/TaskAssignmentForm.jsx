import React, { useState } from "react";

const TaskAssignmentForm = ({ mechanics, onTaskSubmit }) => {
  const [task, setTask] = useState({
    car: "",
    mechanic: "",
    serviceType: "",
    priority: "Medium",
    estimatedCompletion: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.mechanic) {
      alert("Please select a mechanic");
      return;
    }
    onTaskSubmit(task);
    // Reset form after submission
    setTask({
      car: "",
      mechanic: "",
      serviceType: "",
      priority: "Medium",
      estimatedCompletion: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600 p-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Assign a Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="car">
              Car
            </label>
            <input
              type="text"
              id="car"
              name="car"
              value={task.car}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Car Model"
            />
          </div>

          {/* Mechanic Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="mechanic">
              Select Mechanic
            </label>
            <select
              id="mechanic"
              name="mechanic"
              value={task.mechanic}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Mechanic</option>
              {mechanics &&
                mechanics.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Service Type Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="serviceType">
              Service Type
            </label>
            <input
              type="text"
              id="serviceType"
              name="serviceType"
              value={task.serviceType}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Service Type"
            />
          </div>

          {/* Priority Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Estimated Completion Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2" htmlFor="estimatedCompletion">
              Estimated Completion (Hours)
            </label>
            <input
              type="number"
              id="estimatedCompletion"
              name="estimatedCompletion"
              value={task.estimatedCompletion}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Estimated Completion"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Assign Task
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignmentForm;