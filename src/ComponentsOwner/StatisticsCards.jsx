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

// Registering the chart components for Chart.js
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

  // Fetch statistics data from the backend
  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/statistics");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Data for the bar chart (Task Statistics)
  const chartData = {
    labels: ["Total Tasks", "Completed Tasks", "Pending Tasks", "Active Mechanics"],
    datasets: [
      {
        label: "Task Data",
        data: [
          stats.totalTasks,
          stats.completedTasks,
          stats.pendingTasks,
          stats.activeMechanics,
        ],
        backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#6c757d"], // Different colors for each bar
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Task and Revenue Statistics",
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="statistics-cards-container p-6 bg-gradient-to-b from-blue-900 to-indigo-800 rounded-lg shadow-lg">
      <div className="text-left mb-6">
        <button
          onClick={() => navigate("/owner-dashboard")}
          className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Back to Owner Dashboard
        </button>
      </div>

      <h2 className="text-4xl font-bold text-center text-white mb-8">Dashboard Statistics</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="statistics-card bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-blue-700 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold mb-2">{stats.totalTasks}</p>
          <small className="text-gray-400">Assigned to mechanics</small>
        </div>

        <div className="statistics-card bg-green-700 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-green-600 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold mb-2">{stats.completedTasks}</p>
          <small className="text-gray-400">Successfully completed</small>
        </div>

        <div className="statistics-card bg-yellow-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-yellow-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
          <p className="text-3xl font-bold mb-2">{stats.pendingTasks}</p>
          <small className="text-gray-400">Awaiting completion</small>
        </div>

        <div className="statistics-card bg-purple-700 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-purple-600 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold mb-2">${stats.totalRevenue.toLocaleString()}</p>
          <small className="text-gray-400">Generated revenue</small>
        </div>

        <div className="statistics-card bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-blue-500 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Active Mechanics</h3>
          <p className="text-3xl font-bold mb-2">{stats.activeMechanics}</p>
          <small className="text-gray-400">Currently working</small>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-center text-white mb-4">Task Statistics</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StatisticsCards;