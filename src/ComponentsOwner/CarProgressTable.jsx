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
        className="mb-6 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition duration-300"
      >
        &larr; Back to Owner Dashboard
      </button>

      <div className="max-w-6xl mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Car Progress
        </h2>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by car model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Car Progress Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="p-4 text-white">Car Model</th>
                <th className="p-4 text-white">Customer</th>
                <th className="p-4 text-white">Mechanic</th>
                <th className="p-4 text-white">Service Type</th>
                <th className="p-4 text-white">Status</th>
                <th className="p-4 text-white">Progress</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car, index) => (
                <tr
                  key={car.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                  } hover:bg-gray-800 transition duration-300`}
                >
                  <td className="p-4">{car.model}</td>
                  <td className="p-4">{car.customer}</td>
                  <td className="p-4">{car.mechanic}</td>
                  <td className="p-4">{car.serviceType}</td>
                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded text-white ${
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
                  <td className="p-4">
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
            <div className="text-center py-4 text-gray-400">
              No cars match the criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarProgress;