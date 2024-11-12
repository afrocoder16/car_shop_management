import React, { useState } from 'react';

// Sample Data
const serviceHistoryData = [
  {
    id: 1,
    date: '2024-10-15',
    service: 'Engine Overhaul',
    technician: 'John Doe',
    status: 'Completed',
    details: 'Replaced engine parts, performed full diagnostic test, and ensured optimal performance.',
  },
  {
    id: 2,
    date: '2024-09-10',
    service: 'Brake System Repair',
    technician: 'Jane Smith',
    status: 'In Progress',
    details: 'Repairing the brake lines and pads, testing hydraulic systems.',
  },
  {
    id: 3,
    date: '2024-08-05',
    service: 'Oil Change',
    technician: 'Mike Johnson',
    status: 'Completed',
    details: 'Changed oil and filters, checked fluid levels.',
  },
];

const ServiceHistory = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleDetailsClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="page-background">
      <div className="service-history">
        <h1 className="service-history-title">Service History</h1>
        <table className="service-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Technician</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceHistoryData.map((service) => (
              <tr key={service.id}>
                <td>{service.date}</td>
                <td>{service.service}</td>
                <td>{service.technician}</td>
                <td>{service.status}</td>
                <td>
                  <button onClick={() => handleDetailsClick(service)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedService && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h3>Service Details</h3>
              <p><strong>Date:</strong> {selectedService.date}</p>
              <p><strong>Service:</strong> {selectedService.service}</p>
              <p><strong>Technician:</strong> {selectedService.technician}</p>
              <p><strong>Status:</strong> {selectedService.status}</p>
              <p><strong>Details:</strong> {selectedService.details}</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .page-background {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to right, #1e293b, #0f172a);
          padding: 20px;
          color: #black;
        }
        .service-history {
          max-width: 900px;
          width: 100%;
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .service-history-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #1e293b;
        }
        .service-history-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .service-history-table th,
        .service-history-table td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        .service-history-table th {
          background-color: #f4f4f4;
        }
        .service-history-table td {
          background-color: #fff;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 5px;
          width: 400px;
          position: relative;
          color: #000;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
        }
        button {
          background-color: #3b82f6;
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default ServiceHistory;
