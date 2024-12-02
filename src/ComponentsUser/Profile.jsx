import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Customer details (default values)
  const [fullName, setFullName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [email, setEmail] = useState("john@example.com");
  const [address, setAddress] = useState("123 Main St, Springfield");
  const [vinNumber, setVinNumber] = useState("Unknown");
  const [licensePlate, setLicensePlate] = useState("Unknown");
  const [emergencyContact, setEmergencyContact] = useState("Unknown");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSave = () => {
    console.log("Profile updated:", {
      fullName,
      phoneNumber,
      email,
      address,
      vinNumber,
      licensePlate,
      emergencyContact,
      appointmentDate,
      appointmentTime,
      serviceType,
      additionalNotes,
    });
    alert("Profile information saved!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <div className="bg-gray-700 text-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Customer Profile</h2>
          <button
            onClick={() => navigate(-1)} // Navigate back
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Go Back
          </button>
        </div>

        {/* Profile Form */}
        <form>
          {/* Full Name */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* VIN Number */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">VIN Number</label>
            <input
              type="text"
              value={vinNumber}
              onChange={(e) => setVinNumber(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* License Plate */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">License Plate</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Emergency Contact */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Emergency Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Appointment Date */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Appointment Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Appointment Time */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Appointment Time</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Service Type */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a service</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Tire Rotation">Tire Rotation</option>
              <option value="Brake Check">Brake Check</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Additional Notes</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Any additional requests or information..."
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;