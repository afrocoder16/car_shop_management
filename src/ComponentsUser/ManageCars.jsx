import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageCars = () => {
  const navigate = useNavigate();

  // State for managing cars
  const [cars, setCars] = useState([
    { id: 1, make: "Toyota", model: "Corolla", vin: "1HGCM82633A123456", plate: "ABC123" },
    { id: 2, make: "Honda", model: "Civic", vin: "2HGCM82633A654321", plate: "XYZ789" },
  ]);
  const [carForm, setCarForm] = useState({ id: null, make: "", model: "", vin: "", plate: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Add or update car
  const handleSaveCar = () => {
    if (!carForm.make || !carForm.model || !carForm.vin || !carForm.plate) {
      alert("Please fill out all fields!");
      return;
    }

    if (isEditing) {
      // Update the car in the list
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === carForm.id ? { ...carForm } : car))
      );
      alert("Car updated successfully!");
    } else {
      // Add a new car
      setCars((prevCars) => [...prevCars, { ...carForm, id: Date.now() }]);
      alert("Car added successfully!");
    }

    // Reset the form
    setCarForm({ id: null, make: "", model: "", vin: "", plate: "" });
    setIsEditing(false);
  };

  // Edit an existing car
  const handleEditCar = (car) => {
    setCarForm(car);
    setIsEditing(true);
  };

  // Delete a car
  const handleDeleteCar = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
    }
  };

  // Reset form
  const resetForm = () => {
    setCarForm({ id: null, make: "", model: "", vin: "", plate: "" });
    setIsEditing(false);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Cars</h1>
          <button
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Cars List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Cars</h2>
          {cars.length > 0 ? (
            <div className="space-y-4">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-gray-800 p-4 rounded-md shadow-md flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Make:</strong> {car.make}
                    </p>
                    <p>
                      <strong>Model:</strong> {car.model}
                    </p>
                    <p>
                      <strong>VIN:</strong> {car.vin}
                    </p>
                    <p>
                      <strong>License Plate:</strong> {car.plate}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditCar(car)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No cars added yet.</p>
          )}
        </div>

        {/* Add/Edit Car Form */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Car" : "Add a New Car"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveCar();
            }}
          >
            <div className="mb-4">
              <label className="block font-semibold mb-1">Make</label>
              <input
                type="text"
                name="make"
                value={carForm.make}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Toyota"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={carForm.model}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Corolla"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">VIN</label>
              <input
                type="text"
                name="vin"
                value={carForm.vin}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1HGCM82633A123456"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">License Plate</label>
              <input
                type="text"
                name="plate"
                value={carForm.plate}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., ABC123"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-bold"
              >
                {isEditing ? "Save Changes" : "Add Car"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;