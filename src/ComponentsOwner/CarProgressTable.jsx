import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CarProgress = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch car progress data from the backend
  useEffect(() => {
    // Replace this with your API endpoint
    fetch("/api/car-progress")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching car progress:", error));
  }, []);

  // Filter and search logic
  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.model
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus
      ? car.status === filterStatus
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/owner-dashboard")}
        className="mb-6 text-blue-400 hover:text-blue-600 font-semibold text-lg"
      >
        &larr; Back to Owner Dashboard
      </button>

      <div className="max-w-6xl mx-auto bg-gray-700 p-8 rounded-lg shadow-md">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center">Car Progress</h2>

        {/* Search and Filter Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by car model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-1/3 p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Car Progress Table */}
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden text-white">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3">Car Model</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Mechanic</th>
              <th className="p-3">Service Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id} className="border-t border-gray-700">
                <td className="p-3">{car.model}</td>
                <td className="p-3">{car.customer}</td>
                <td className="p-3">{car.mechanic}</td>
                <td className="p-3">{car.serviceType}</td>
                <td className="p-3">
                  <span
                    className={`py-1 px-3 rounded text-white ${
                      car.status === "Pending"
                        ? "bg-yellow-500"
                        : car.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="relative w-full h-4 bg-gray-600 rounded">
                    <div
                      className="absolute top-0 left-0 h-4 rounded bg-blue-500"
                      style={{ width: `${car.progress}%` }}
                    ></div>
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-white">
                      {car.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCars.length === 0 && (
          <p className="text-center mt-4">No cars match the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default CarProgress;