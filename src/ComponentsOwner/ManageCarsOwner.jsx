import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ManageCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([
    { id: 1, make: "Toyota", model: "Corolla", vin: "1HGCM82633A123456" },
    { id: 2, make: "Honda", model: "Civic", vin: "2HGCM82633A654321" },
  ]);
  const [newCar, setNewCar] = useState({ make: "", model: "", vin: "" });

  const addCar = () => {
    if (!newCar.make || !newCar.model || !newCar.vin) {
      alert("Please fill in all fields.");
      return;
    }
    setCars([...cars, { ...newCar, id: cars.length + 1 }]);
    setNewCar({ make: "", model: "", vin: "" });
    alert("Car added successfully!");
  };

  const removeCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
    alert("Car removed successfully!");
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
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <button
        onClick={() => navigate("/owner-dashboard")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
      >
        Back to Owner Dashboard
        </button>

        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-8">Manage Cars</h1>

        {/* Car List Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Your Cars</h2>
          <ul className="space-y-4">
            {cars.map((car) => (
              <motion.li
                key={car.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg"
              >
                <div>
                  <p className="font-bold text-lg">{car.make} {car.model}</p>
                  <p className="text-sm text-gray-400">VIN: {car.vin}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeCar(car.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Remove
                </motion.button>
              </motion.li>
            ))}
          </ul>
          {cars.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No cars available. Add a new car to get started.
            </p>
          )}
        </motion.div>

        {/* Add New Car Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Add a New Car</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Make"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="VIN"
              value={newCar.vin}
              onChange={(e) => setNewCar({ ...newCar, vin: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addCar}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-bold transition duration-300"
            >
              Add Car
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ManageCars;