import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Fetch user information from the backend
    const fetchUserName = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/customers/get-customer-name/", {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const fullName = data.name || `${data.first_name || ""} ${data.last_name || ""}`.trim();
          setUserName(fullName || "User");
        } else {
          console.error("Failed to fetch user name: ", response.status);
          setUserName("User");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName("User");
      }
    };

    fetchUserName();
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      {/* Main Wrapper */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/5 bg-gray-800 p-6 rounded-lg shadow-xl"
        >
          <h1 className="text-3xl font-extrabold text-blue-500 mb-8">
            Auto Shop
          </h1>
          <ul className="space-y-6">
            {[
              { name: "Dashboard", path: "/Dashboard" },
              { name: "Bookings", path: "/bookings" },
              { name: "Billing", path: "/billing" },
              { name: "Profile", path: "/profile" },
              { name: "Manage Cars", path: "/manage-cars" },
              { name: "Explore Services", path: "/explore-service" },
              { name: "Settings", path: "/settings" },
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-blue-400 cursor-pointer transition-all duration-200 text-lg font-semibold"
                onClick={() => navigateTo(item.path)}
                title={`Go to ${item.name}`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold mb-10 text-center"
          >
            Welcome back, {userName}!
          </motion.h2>
        

          {/* Grid Layout */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 gap-8"
          >
            {/* Car Progress Tracker */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="col-span-2 bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">Car Progress Tracker</h3>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-lg transition-all"
                  onClick={() => navigateTo("/bookings")}
                >
                  Make Appointment
                </button>
              </div>
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full p-3 rounded-md text-black mb-4"
              />
              <ul className="space-y-4 h-[70%] overflow-y-auto">
                {[
                  { name: "Car #1: Oil Change", status: "In Progress" },
                  { name: "Car #2: Brake Check", status: "Completed" },
                  { name: "Car #3: Tire Rotation", status: "Pending" },
                ].map((car, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600"
                  >
                    <span>{car.name}</span>
                    <span className="font-bold text-blue-400">{car.status}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Payment Summary */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg cursor-pointer"
              onClick={() => navigateTo("/billing?view=summary")}
            >
              <h3 className="text-3xl font-bold mb-4">Payment Summary</h3>
              <ul className="space-y-4">
                {[
                  { date: "March 1, 2020", amount: "$180" },
                  { date: "February 10, 2021", amount: "$250" },
                ].map((payment, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-gray-700 p-3 rounded-md"
                  >
                    <span>{payment.date}</span>
                    <span className="font-bold">{payment.amount}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Recent Repairs */}
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-4">Recent Repairs</h3>
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => navigateTo("/recent-repairs")}
          className="bg-gray-800 p-6 rounded-lg shadow-md h-60 cursor-pointer overflow-y-auto"
        >
          <div className="space-y-4">
            {[
              { name: "Oil Change", time: "2 Days Ago", color: "green" },
              { name: "Brake Repair", time: "3 Days Ago", color: "yellow" },
              { name: "Transmission Service", time: "In Progress", color: "red" },
            ].map((repair, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-700 p-4 rounded-lg hover:bg-gray-600 shadow-md"
              >
                <span>{repair.name}</span>
                <span className={`text-${repair.color}-400 font-bold`}>
                  {repair.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Explore Services */}
      <div className="mt-12">
        <h3 className="text-3xl font-bold mb-4">Explore Services</h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="flex overflow-x-auto space-x-6 h-48">
            {[
              { name: "Oil Change", image: "/image/oil-change.jpg" },
              { name: "Wheel Alignment", image: "/image/wheel-alignment.jpg" },
              { name: "Brake Repair", image: "/image/brake-repair.jpg" },
              { name: "Tire Replacement", image: "/image/tire-replacement.jpg" },
              { name: "AC Service", image: "/image/ac-service.jpg" },
            ].map((service, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={index}
                className="flex-shrink-0 bg-cover bg-center h-48 w-72 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
                style={{ backgroundImage: `url(${service.image})` }}
                onClick={() => navigateTo(`/explore-service?service=${service.name}`)}
              >
                <p className="bg-blue-900 bg-opacity-75 px-4 py-2 rounded-md text-center text-white font-bold">
                  {service.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
