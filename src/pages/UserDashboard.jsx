import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [carProgress, setCarProgress] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(0);
  const [recentRepairs, setRecentRepairs] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    progress: true,
    payment: true,
    repairs: true,
  });
  const [error, setError] = useState({
    user: null,
    progress: null,
    payment: null,
    repairs: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userResponse = await fetch("http://127.0.0.1:8000/api/customers/get-customer-name/", {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const fullName = userData.name || `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
          setUserName(fullName || "User");
        } else {
          setError((prev) => ({ ...prev, user: "Failed to fetch user name." }));
        }
      } catch (err) {
        setError((prev) => ({ ...prev, user: "An error occurred while fetching user name." }));
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }

      try {
        const progressResponse = await fetch("http://127.0.0.1:8000/api/services/car-progress/", {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setCarProgress(progressData);
        } else {
          setError((prev) => ({ ...prev, progress: "Failed to fetch car progress." }));
        }
      } catch (err) {
        setError((prev) => ({ ...prev, progress: "An error occurred while fetching car progress." }));
      } finally {
        setLoading((prev) => ({ ...prev, progress: false }));
      }

      try {
        const paymentSummaryResponse = await fetch("http://127.0.0.1:8000/api/services/payment-summary/", {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (paymentSummaryResponse.ok) {
          const paymentData = await paymentSummaryResponse.json();
          setPaymentSummary(paymentData.total_cost || 0);
        } else {
          setError((prev) => ({ ...prev, payment: "Failed to fetch payment summary." }));
        }
      } catch (err) {
        setError((prev) => ({ ...prev, payment: "An error occurred while fetching payment summary." }));
      } finally {
        setLoading((prev) => ({ ...prev, payment: false }));
      }

      try {
        const repairsResponse = await fetch("http://127.0.0.1:8000/api/services/service-history/", {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (repairsResponse.ok) {
          const repairsData = await repairsResponse.json();
          setRecentRepairs(repairsData);
        } else {
          setError((prev) => ({ ...prev, repairs: "Failed to fetch recent repairs." }));
        }
      } catch (err) {
        setError((prev) => ({ ...prev, repairs: "An error occurred while fetching recent repairs." }));
      } finally {
        setLoading((prev) => ({ ...prev, repairs: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="flex gap-6">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/5 bg-gray-800 p-6 rounded-lg shadow-xl"
        >
          <h1 className="text-3xl font-extrabold text-blue-500 mb-8">Auto Shop</h1>
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
              >
                {item.name}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold mb-10 text-center"
          >
            Welcome back, {userName}!
          </motion.h2>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 gap-8"
          >
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
              {loading.repairs ? (
                <p>Loading service history...</p>
              ) : error.repairs ? (
                <p className="text-red-500">{error.repairs}</p>
              ) : recentRepairs.length > 0 ? (
                <ul className="space-y-4">
                  {recentRepairs.map((service, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600"
                    >
                      <div className="flex justify-between">
                        <span className="font-bold">{service.service_type}</span>
                        <span className="text-sm text-gray-400">{service.service_date}</span>
                      </div>
                      <p>
                        Status: <span className="text-yellow-400">{service.status}</span>
                      </p>
                      <p>Mechanic: {service.mechanic}</p>
                      <p>Estimated Completion Time: {service.estimated_completion_time}</p>
                      <p>Notes: {service.notes}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No service history available.</p>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg cursor-pointer"
              onClick={() => navigateTo("/billing?view=summary")}
            >
              <h3 className="text-3xl font-bold mb-4">Payment Summary</h3>
              {loading.payment ? (
                <p>Loading payment summary...</p>
              ) : error.payment ? (
                <p className="text-red-500">{error.payment}</p>
              ) : paymentSummary > 0 ? (
                <p className="text-4xl font-extrabold">${paymentSummary.toFixed(2)}</p>
              ) : (
                <p>No payment summary available.</p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

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
