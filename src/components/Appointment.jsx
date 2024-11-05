import React, { useState } from 'react';

export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    serviceType: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to a server
    console.log('Appointment data submitted:', formData);
    alert('Your appointment has been booked successfully!');
    // Clear the form
    setFormData({
      name: '',
      contact: '',
      date: '',
      time: '',
      serviceType: '',
      notes: '',
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white p-6">
      <div className="max-w-lg w-full bg-slate-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Book an Appointment</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Customer Name */}
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

          {/* Contact Information */}
          <div>
            <label htmlFor="contact" className="block mb-1">Contact (Phone or Email)</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
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
              <option value="Oil Change">Oil Change</option>
              <option value="Tire Rotation">Tire Rotation</option>
              <option value="Brake Inspection">Brake Inspection</option>
              <option value="Engine Diagnostics">Engine Diagnostics</option>
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
