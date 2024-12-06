import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css"; // Custom styles for the calendar
import { motion } from "framer-motion";

const Bookings = () => {
  const [date, setDate] = useState(new Date());
  const [confirmedAppointments, setConfirmedAppointments] = useState([
    { service: "Oil Change", date: "Nov 28, 2024", status: "Confirmed" },
    { service: "Brake Check", date: "Nov 25, 2024", status: "Pending" },
  ]);

  const [previousAppointments] = useState([
    { car: "Toyota Corolla", service: "Tire Rotation", date: "Nov 20, 2024", status: "Completed" },
    { car: "Honda Civic", service: "Battery Replacement", date: "Nov 15, 2024", status: "Cancelled" },
  ]);

  const handleBack = () => {
    window.location.href = "/Dashboard";
  };

  const handleConfirmAppointment = () => {
    const newAppointment = {
      service: "Custom Service",
      date: date.toDateString(),
      status: "Pending",
    };
    setConfirmedAppointments((prev) => [...prev, newAppointment]);
    alert(`Appointment added as Pending for ${date.toDateString()}`);
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedAppointments = [...confirmedAppointments];
    updatedAppointments[index].status = newStatus;
    setConfirmedAppointments(updatedAppointments);
  };

  const handleDeleteAppointment = (index) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = confirmedAppointments.filter((_, i) => i !== index);
      setConfirmedAppointments(updatedAppointments);
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
          onClick={handleBack}
          className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mt-8 mb-10">Manage Your Bookings</h1>

      {/* Calendar Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-700 p-8 rounded-lg shadow-lg mb-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Book a New Appointment</h2>
        <div className="flex justify-center mb-6">
          <Calendar
            onChange={setDate}
            value={date}
            className="custom-calendar"
          />
        </div>
        <p className="text-center text-lg">
          Selected Date: <strong className="text-blue-400">{date.toDateString()}</strong>
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
                <p><strong>Service:</strong> {appointment.service}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      appointment.status === "Confirmed" ? "text-green-400" :
                      appointment.status === "Pending" ? "text-yellow-400" : "text-red-400"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
                <div className="flex space-x-4 mt-4">
                  {appointment.status === "Pending" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleUpdateStatus(index, "Confirmed")}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
                    >
                      Mark as Confirmed
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDeleteAppointment(index)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold"
                  >
                    Delete
                  </motion.button>
                </div>
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
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-500 py-2">Car</th>
              <th className="border-b border-gray-500 py-2">Service</th>
              <th className="border-b border-gray-500 py-2">Date</th>
              <th className="border-b border-gray-500 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {previousAppointments.map((appointment, index) => (
              <tr key={index}>
                <td className="py-2">{appointment.car}</td>
                <td className="py-2">{appointment.service}</td>
                <td className="py-2">{appointment.date}</td>
                <td
                  className={`py-2 font-bold ${
                    appointment.status === "Completed" ? "text-green-400" :
                    appointment.status === "Cancelled" ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Bookings;