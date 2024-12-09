import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css"; // Custom styles for the calendar
import { motion } from "framer-motion";

const Bookings = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    serviceType: "",
  });
  const [services, setServices] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    // Fetch services and appointments from the backend
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Customer Data
        const customerResponse = await fetch(
          "http://127.0.0.1:8000/api/customers/customer-profile/",
          {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          }
        );

        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          setCustomerId(customerData.id);
        } else {
          setError("Failed to fetch customer information.");
        }

        const [servicesRes, appointmentsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/services/service-types/", {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          }),
          fetch("http://127.0.0.1:8000/api/services/appointments/", {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          }),
        ]);

        if (servicesRes.ok && appointmentsRes.ok) {
          const servicesData = await servicesRes.json();
          const appointmentsData = await appointmentsRes.json();

          setServices(servicesData);
          setConfirmedAppointments(
            appointmentsData.filter((appt) => appt.status === "Confirmed")
          );
          setPreviousAppointments(
            appointmentsData.filter((appt) => appt.status !== "Confirmed")
          );
        } else {
          setError("Failed to fetch services or appointments.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmAppointment = async () => {
    if (!formData.serviceType) {
      alert("Please select a service.");
      return;
    }

    if (!customerId) {
      alert("Failed to fetch customer data. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/services/appointments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            customer: customerId,
            service_type: formData.serviceType,
            appointment_date: formData.date.toISOString().split("T")[0],
            status: "Pending",
          }),
        }
      );

      if (response.ok) {
        const newAppointment = await response.json();
        setConfirmedAppointments((prev) => [...prev, newAppointment]);
        alert(
          `Appointment for ${formData.serviceType} on ${formData.date.toDateString()} added successfully!`
        );
        setFormData({ ...formData, serviceType: "" });
      } else {
        const errorData = await response.json();
        alert(`Failed to book appointment: ${errorData.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error confirming appointment:", err);
      alert("An error occurred while booking the appointment. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      {/* Back Button */}
      <div>
        <button
          onClick={() => (window.location.href = "/Dashboard")}
          className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mt-8 mb-10">Manage Your Bookings</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* Calendar Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-700 p-8 rounded-lg shadow-lg mb-10"
          >
            <h2 className="text-3xl font-bold text-center mb-6">Book a New Appointment</h2>
            <div className="flex flex-col items-center mb-6">
              <Calendar
                onChange={(date) => setFormData({ ...formData, date })}
                value={formData.date}
                className="custom-calendar mb-4"
              />
              <select
                name="serviceType"
                className="p-3 rounded-md text-black w-64"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a Service
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-center text-lg">
              Selected Date: <strong className="text-blue-400">{formData.date.toDateString()}</strong>
            </p>
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg"
                onClick={handleConfirmAppointment}
              >
                Confirm Appointment
              </motion.button>
            </div>
          </motion.div>

          {/* Confirmed Appointments Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-700 p-8 rounded-lg shadow-lg mb-10"
          >
            <h2 className="text-3xl font-bold text-center mb-6">Confirmed Appointments</h2>
            {confirmedAppointments.length > 0 ? (
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {confirmedAppointments.map((appointment, index) => (
                  <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <p><strong>Service:</strong> {appointment.service_type_name}</p>
                    <p><strong>Date:</strong> {new Date(appointment.appointment_date).toDateString()}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No confirmed appointments yet!</p>
            )}
          </motion.div>

          {/* Previous Appointments Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-700 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center mb-6">Previous Appointments</h2>
            {previousAppointments.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-500 py-2">Service</th>
                    <th className="border-b border-gray-500 py-2">Date</th>
                    <th className="border-b border-gray-500 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {previousAppointments.map((appointment, index) => (
                    <tr key={index}>
                      <td className="py-2">{appointment.service_type_name}</td>
                      <td className="py-2">{new Date(appointment.appointment_date).toDateString()}</td>
                      <td className="py-2">{appointment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No previous appointments yet!</p>
            )}
          </motion.div>
        </>
      )}

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </motion.div>
  );
};

export default Bookings;
