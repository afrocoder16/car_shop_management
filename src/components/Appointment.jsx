import React, { useState, useEffect } from 'react';

export default function AppointmentBooking() {
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
    date: '',
    time: '',
    serviceType: '',
    notes: '',
  });

  const [authToken, setAuthToken] = useState('');

  // Fetch the authentication token from local storage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    } else {
      alert('You must be logged in to book an appointment.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      alert('Authentication is required. Please log in.');
      return;
    }

    try {
      // Create or retrieve the customer
      const customerResponse = await fetch('http://127.0.0.1:8000/api/customers/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.phone_number,
          email: formData.email,
          address: formData.address,
          car_make: formData.car_make,
          car_model: formData.car_model,
          car_year: formData.car_year,
          vin_number: formData.vin_number,
          license_plate: formData.license_plate,
          loyalty_points: formData.loyalty_points,
          membership_level: formData.membership_level,
          preferred_service_time: formData.preferred_service_time,
          emergency_contact: formData.emergency_contact,
        }),
      });

      if (!customerResponse.ok) {
        const customerError = await customerResponse.json();
        if (customerError.detail === 'Account already exists. Please sign in.') {
          alert('Account already exists. Please log in to continue.');
          return;
        }
        const errorMessage = Object.values(customerError).flat().join(', ');
        alert('Error creating customer: ' + errorMessage);
        return;
      }

      const customerData = await customerResponse.json();

      // Create the appointment
      const appointmentResponse = await fetch('http://127.0.0.1:8000/api/services/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          customer: customerData.id,
          appointment_date: formData.date,
          appointment_time: formData.time,
          service_type: formData.serviceType,
          notes: formData.notes,
          status: 'Pending',
        }),
      });

      if (appointmentResponse.ok) {
        alert('Your appointment has been booked successfully!');
        setFormData({
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
          date: '',
          time: '',
          serviceType: '',
          notes: '',
        });
      } else {
        const appointmentError = await appointmentResponse.json();
        alert('Error booking appointment: ' + JSON.stringify(appointmentError));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to book the appointment. Please try again later.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white p-6">
      <div className="max-w-lg w-full bg-slate-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Book an Appointment</h2>

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

          {/* Appointment Date */}
          <div>
            <label htmlFor="date" className="block mb-1">Appointment Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Appointment Time */}
          <div>
            <label htmlFor="time" className="block mb-1">Appointment Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          {/* Service Type */}
          <div>
            <label htmlFor="serviceType" className="block mb-1">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded"
            >
              <option value="">Select a service</option>
              <option value="1">Oil Change</option>
              <option value="2">Tire Rotation</option>
              <option value="3">Brake Inspection</option>
              <option value="4">Engine Diagnostics</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block mb-1">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 text-black rounded"
              placeholder="Any additional requests or information..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </main>
  );
}
