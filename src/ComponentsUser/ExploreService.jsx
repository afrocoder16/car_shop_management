import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ExploreService = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract service type from query parameters
  const preSelectedServiceType =
    new URLSearchParams(location.search).get("service") || "";

  // Example car data from user's account
  const userCars = [
    { id: 1, make: "Toyota", model: "Corolla", vin: "1HGCM82633A123456" },
    { id: 2, make: "Honda", model: "Civic", vin: "2HGCM82633A654321" },
  ];

  // Example services
  const services = [
    "Oil Change",
    "Brake Inspection",
    "Wheel Alignment",
    "Transmission Service",
  ];

  // State to manage selected car, service, date, and additional notes
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedService, setSelectedService] = useState(preSelectedServiceType);
  const [selectedDate, setSelectedDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Handle service request confirmation
  const handleServiceRequest = () => {
    if (!selectedCar || !selectedDate) {
      alert("Please select a car and date.");
      return;
    }

    const requestData = {
      serviceType: selectedService || "Not Specified",
      car: userCars.find((car) => car.id === parseInt(selectedCar)),
      date: selectedDate,
      notes: additionalNotes,
    };

    console.log("Service Requested:", requestData);

    alert(
      `Your ${selectedService || "selected"} service has been scheduled for ${selectedDate}. You can add more services if needed.`
    );

    // Reset form for additional services
    setSelectedCar("");
    setSelectedDate("");
    setAdditionalNotes("");
    if (!preSelectedServiceType) setSelectedService(""); // Reset service only if not pre-selected
  };

  // Navigate back to the dashboard
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 text-center">
          Quick Service: {preSelectedServiceType || "Explore"}
        </h1>

        {/* Service Form */}
        <form className="space-y-6">
          {/* Select Service */}
          <div>
            <label htmlFor="service" className="block text-lg font-semibold mb-2">
              Select Service (Optional)
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Select Car */}
          <div>
            <label htmlFor="car" className="block text-lg font-semibold mb-2">
              Select Your Car
            </label>
            <select
              id="car"
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a car</option>
              {userCars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.make} {car.model} (VIN: {car.vin})
                </option>
              ))}
            </select>
          </div>

          {/* Select Date */}
          <div>
            <label htmlFor="date" className="block text-lg font-semibold mb-2">
              Choose a Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-lg font-semibold mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Any specific requests or information about the service?"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold transition duration-200"
            >
              Back to Dashboard
            </button>
            <button
              type="button"
              onClick={handleServiceRequest}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-bold transition duration-200"
            >
              Confirm Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExploreService;