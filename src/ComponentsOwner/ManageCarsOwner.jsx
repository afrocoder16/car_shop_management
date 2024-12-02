import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageCars = () => {
  const navigate = useNavigate(); // To navigate back to Owner Dashboard
  const [cars, setCars] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', vin: '1HGCM82633A123456' },
    { id: 2, make: 'Honda', model: 'Civic', vin: '2HGCM82633A654321' },
  ]);
  const [newCar, setNewCar] = useState({ make: '', model: '', vin: '' });

  const addCar = () => {
    if (!newCar.make || !newCar.model || !newCar.vin) {
      alert('Please fill in all fields.');
      return;
    }
    setCars([...cars, { ...newCar, id: cars.length + 1 }]);
    setNewCar({ make: '', model: '', vin: '' });
    alert('Car added successfully!');
  };

  const removeCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
    alert('Car removed successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/owner-dashboard")}
          className="mb-6 text-blue-400 hover:text-blue-600"
        >
          Back to Owner Dashboard
        </button>

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8">Manage Cars</h1>

        {/* Car List Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Cars</h2>
          <ul className="space-y-4">
            {cars.map((car) => (
              <li
                key={car.id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-md shadow-md"
              >
                <div>
                  <p className="font-bold text-lg">{car.make} {car.model}</p>
                  <p className="text-sm text-gray-400">VIN: {car.vin}</p>
                </div>
                <button
                  onClick={() => removeCar(car.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {cars.length === 0 && <p className="text-center text-gray-400 mt-4">No cars available.</p>}
        </div>

        {/* Add New Car Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add a New Car</h2>
          <input
            type="text"
            placeholder="Make"
            value={newCar.make}
            onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white mb-4"
          />
          <input
            type="text"
            placeholder="Model"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white mb-4"
          />
          <input
            type="text"
            placeholder="VIN"
            value={newCar.vin}
            onChange={(e) => setNewCar({ ...newCar, vin: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white mb-4"
          />
          <button
            onClick={addCar}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
          >
            Add Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;