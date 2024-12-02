import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

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
    <div>
      <h2>Analytics Overview</h2>
      <div className="chart-container">
        {/* Line Chart: Tasks Completed Over Time */}
        <div className="chart">
          <h3>Tasks Completed</h3>
          <Line
            data={{
              labels: analyticsData.tasksCompleted.map((item) => item.date),
              datasets: [
                {
                  label: "Tasks Completed",
                  data: analyticsData.tasksCompleted.map((item) => item.count),
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
            }}
          />
        </div>

        {/* Bar Chart: Revenue Over Time */}
        <div className="chart">
          <h3>Revenue Generated</h3>
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
                legend: { display: true },
              },
            }}
          />
        </div>

        {/* Pie Chart: Mechanics Performance */}
        <div className="chart">
          <h3>Mechanics Performance</h3>
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
                legend: { position: "bottom" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;