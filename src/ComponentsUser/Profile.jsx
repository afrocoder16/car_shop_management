import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    address: '',
    car_make: 'Unknown',
    car_model: 'Unknown',
    car_year: 2000,
    vin_number: 'Unknown',
    license_plate: 'Unknown',
    loyalty_points: 0,
    membership_level: '',
    preferred_service_time: '',
    emergency_contact: '',
  });

  const [authToken, setAuthToken] = useState('');
  const navigate = useNavigate();

  // Fetch the authentication token from local storage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    } else {
      console.log('No authentication token found.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      console.log('Authentication token missing. Changes will not be saved to the server.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/customers/customers/', {
        method: 'PUT', // Use PUT to update the profile
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        alert('Error saving profile: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save the profile. Please try again later.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard'); // Adjust '/dashboard' to your actual dashboard route
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white p-6">
      <div className="max-w-lg w-full bg-slate-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone_number" className="block mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* VIN Number */}
          <div>
            <label htmlFor="vin_number" className="block mb-1">VIN Number</label>
            <input
              type="text"
              id="vin_number"
              name="vin_number"
              value={formData.vin_number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* License Plate */}
          <div>
            <label htmlFor="license_plate" className="block mb-1">License Plate</label>
            <input
              type="text"
              id="license_plate"
              name="license_plate"
              value={formData.license_plate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label htmlFor="emergency_contact" className="block mb-1">Emergency Contact</label>
            <input
              type="text"
              id="emergency_contact"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
          >
            Save Profile
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md mt-2"
          >
            Back to Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}