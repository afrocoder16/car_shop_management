import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("User"); // Default to "User" until data is fetched
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's name from the backend
    const fetchUserName = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/customers/customer-name-display/", {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the auth token
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user name: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUserName(data.name || "User");
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleReload = () => {
    navigate("/dashboard"); // Navigate to /dashboard instead of reloading
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-800 p-6 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Auto Shop</h1>
          <ul className="space-y-4">
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={handleReload}
            >
              Dashboard
            </li>
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigateTo("/bookings")}
            >
              Bookings
            </li>
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigateTo("/billing")}
            >
              Billing
            </li>
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigateTo("/profile")}
            >
              Profile
            </li>
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigateTo("/manage-cars")}
            >
              Manage Cars
            </li>
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigateTo("/explore-service")}
            >
              Explore Services
            </li>
            <li
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigateTo("/settings")}
            >
              Settings
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <h2 className="text-4xl font-bold mb-8 text-center">
            Welcome back, {userName}
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {/* Car Progress Tracker */}
            <div className="col-span-2 bg-gray-800 p-6 rounded-md shadow-md h-[60vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Car Progress Tracker</h3>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
                  onClick={() => navigateTo("/bookings")}
                >
                  Make Appointment
                </button>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 rounded text-black mb-4"
              />
              <ul className="space-y-2 h-[80%] overflow-y-auto">
                <li className="flex justify-between bg-gray-700 p-3 rounded">
                  <span>Car #1: Oil Change</span>
                  <span>Status: In Progress</span>
                </li>
                <li className="flex justify-between bg-gray-700 p-3 rounded">
                  <span>Car #2: Brake Check</span>
                  <span>Status: Completed</span>
                </li>
                <li className="flex justify-between bg-gray-700 p-3 rounded">
                  <span>Car #3: Tire Rotation</span>
                  <span>Status: Pending</span>
                </li>
              </ul>
            </div>

            {/* Payment Summary Button */}
            <div
              className="bg-gray-800 p-6 rounded-md shadow-md cursor-pointer hover:bg-gray-700"
              onClick={() => navigateTo("/billing?view=summary")}
            >
              <h3 className="text-2xl font-semibold mb-4">Payment Summary</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>March 1, 2020</span>
                  <span>$180</span>
                </li>
                <li className="flex justify-between">
                  <span>February 10, 2021</span>
                  <span>$250</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Repairs */}
      <div className="bg-gray-800 p-6 rounded-md shadow-md mt-6">
        <h3 className="text-2xl font-semibold mb-4">Recent Repairs</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Last Oil Change</span>
            <span className="text-green-400">2 Days Ago</span>
          </li>
          <li className="flex justify-between">
            <span>Transmission Service</span>
            <span className="text-red-400">In Progress</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
