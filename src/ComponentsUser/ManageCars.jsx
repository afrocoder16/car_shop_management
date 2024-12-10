import React, { useState } from "react";
import { motion } from "framer-motion";
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
    navigate("/Dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Cars</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Back to Dashboard
          </motion.button>
        </div>

        {/* Cars List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Cars</h2>
          {cars.length > 0 ? (
            <div className="space-y-4">
              {cars.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-md shadow-md flex justify-between items-center hover:shadow-lg"
                >
                  <div>
                    <p className="font-semibold">
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditCar(car)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteCar(car.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No cars added yet.</p>
          )}
        </div>

        {/* Add/Edit Car Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-md shadow-md"
        >
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
              <label className="block font-semibold mb-2">Make</label>
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
              <label className="block font-semibold mb-2">Model</label>
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
              <label className="block font-semibold mb-2">VIN</label>
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
              <label className="block font-semibold mb-2">License Plate</label>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-bold"
              >
                {isEditing ? "Save Changes" : "Add Car"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ManageCars;