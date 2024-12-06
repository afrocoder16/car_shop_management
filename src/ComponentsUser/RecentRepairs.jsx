import React from "react";
import { useNavigate } from "react-router-dom";

const RecentRepairs = () => {
  const navigate = useNavigate();

  // Example detailed repair data
  const repairDetails = [
    {
      id: 1,
      name: "Oil Change",
      date: "2 Days Ago",
      status: "Completed",
      cost: "$50",
      description: "Regular oil change to ensure engine longevity and performance.",
    },
    {
      id: 2,
      name: "Brake Repair",
      date: "3 Days Ago",
      status: "In Progress",
      cost: "$150",
      description:
        "Brake pad replacement and rotor resurfacing for improved stopping power.",
    },
    {
      id: 3,
      name: "Transmission Service",
      date: "1 Week Ago",
      status: "Pending",
      cost: "$300",
      description: "Full transmission flush and fluid replacement.",
    },
  ];

  // Navigate back to the dashboard
  const handleBack = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 text-center">Recent Repairs</h1>

        {/* Repairs List */}
        <div className="space-y-6">
          {repairDetails.map((repair) => (
            <div
              key={repair.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-extrabold">{repair.name}</h2>
                <span
                  className={`text-${
                    repair.status === "Completed"
                      ? "green-400"
                      : repair.status === "In Progress"
                      ? "yellow-400"
                      : "red-400"
                  } font-bold`}
                >
                  {repair.status}
                </span>
              </div>
              <p className="mb-2">
                <span className="font-semibold">Date:</span> {repair.date}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Cost:</span> {repair.cost}
              </p>
              <p>
                <span className="font-semibold">Details:</span> {repair.description}
              </p>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold transition duration-200"
            onClick={handleBack}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentRepairs;