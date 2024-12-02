import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
    window.location.href = "/";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Bookings</h1>

      {/* Calendar Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Book a New Appointment</h2>
        <div className="flex justify-center mb-4">
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className="text-center mb-4">Selected Date: <strong>{date.toDateString()}</strong></p>
        <div className="flex justify-center">
          <button
            onClick={handleConfirmAppointment}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Confirm Appointment
          </button>
        </div>
      </div>

      {/* Confirmed Appointments Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Confirmed Appointments</h2>
        {confirmedAppointments.length > 0 ? (
          <ul className="space-y-4 max-h-72 overflow-y-auto">
            {confirmedAppointments.map((appointment, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-lg shadow">
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
                    <button
                      onClick={() => handleUpdateStatus(index, "Confirmed")}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                      Mark as Confirmed
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteAppointment(index)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No confirmed appointments yet!</p>
        )}
      </div>

      {/* Previous Appointments Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Previous Appointments</h2>
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
      </div>
    </div>
  );
};

export default Bookings;