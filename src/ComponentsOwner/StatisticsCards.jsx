import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsCards = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalRevenue: 0,
    activeMechanics: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch("/api/statistics");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const chartData = {
    labels: ["Total Tasks", "Completed Tasks", "Pending Tasks", "Active Mechanics"],
    datasets: [
      {
        label: "Statistics",
        data: [
          stats.totalTasks,
          stats.completedTasks,
          stats.pendingTasks,
          stats.activeMechanics,
        ],
        backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#6c757d"],
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Task and Mechanic Performance",
        font: { size: 18 },
      },
      legend: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/owner-dashboard")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
          >
            Back to Owner Dashboard
          </button>
        </div>

        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-8">Dashboard Statistics</h2>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold">{stats.totalTasks}</p>
            <span className="text-gray-400">Assigned to mechanics</span>
          </div>

          <div className="bg-green-700 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-green-600 transition duration-300">
            <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
            <p className="text-3xl font-bold">{stats.completedTasks}</p>
            <span className="text-gray-400">Successfully completed</span>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-yellow-400 transition duration-300">
            <h3 className="text-lg font-semibold mb-2">Pending Tasks</h3>
            <p className="text-3xl font-bold">{stats.pendingTasks}</p>
            <span className="text-gray-400">Awaiting completion</span>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-purple-500 transition duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            <span className="text-gray-400">Generated revenue</span>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-blue-500 transition duration-300">
            <h3 className="text-lg font-semibold mb-2">Active Mechanics</h3>
            <p className="text-3xl font-bold">{stats.activeMechanics}</p>
            <span className="text-gray-400">Currently working</span>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-6">Task Statistics</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;