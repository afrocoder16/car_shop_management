import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { motion } from "framer-motion";

const AnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState({
    tasksCompleted: [],
    revenue: [],
    mechanicsPerformance: [],
  });

  // Fetch analytics data from the backend
  useEffect(() => {
    // Replace this with your API endpoint
    fetch("/api/analytics")
      .then((response) => response.json())
      .then((data) => {
        setAnalyticsData(data);
      })
      .catch((error) => console.error("Error fetching analytics data:", error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg"
      >
        <h2 className="text-4xl font-bold text-center text-blue-400 mb-8">
          Analytics Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Line Chart: Tasks Completed Over Time */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">
              Tasks Completed
            </h3>
            <Line
              data={{
                labels: analyticsData.tasksCompleted.map((item) => item.date),
                datasets: [
                  {
                    label: "Tasks Completed",
                    data: analyticsData.tasksCompleted.map(
                      (item) => item.count
                    ),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, labels: { color: "white" } },
                },
                scales: {
                  x: { ticks: { color: "white" } },
                  y: { ticks: { color: "white" } },
                },
              }}
            />
          </motion.div>

          {/* Bar Chart: Revenue Over Time */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">
              Revenue Generated
            </h3>
            <Bar
              data={{
                labels: analyticsData.revenue.map((item) => item.month),
                datasets: [
                  {
                    label: "Revenue ($)",
                    data: analyticsData.revenue.map((item) => item.amount),
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, labels: { color: "white" } },
                },
                scales: {
                  x: { ticks: { color: "white" } },
                  y: { ticks: { color: "white" } },
                },
              }}
            />
          </motion.div>

          {/* Pie Chart: Mechanics Performance */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">
              Mechanics Performance
            </h3>
            <Pie
              data={{
                labels: analyticsData.mechanicsPerformance.map(
                  (mechanic) => mechanic.name
                ),
                datasets: [
                  {
                    data: analyticsData.mechanicsPerformance.map(
                      (mechanic) => mechanic.tasksCompleted
                    ),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom", labels: { color: "white" } },
                },
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsChart;